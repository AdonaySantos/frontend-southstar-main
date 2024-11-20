import Post from "../components/Posts.jsx";
import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import logo from "../assets/favicon.ico";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../functions/handleLogout.jsx";
import "../static/Perfil.css";
import { fetchUserData } from "../functions/fetchUserData.jsx";
import { fetchUserPosts } from "../functions/fetchUserPosts.jsx";

export default function Perfil() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Gerencia o token no estado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUserData(token, setUserData, setError);
    }
  }, [token]);

  // Fetch de posts do usuário após os dados estarem disponíveis
  useEffect(() => {
    if (userData?.name) {
      fetchUserPosts(setPosts, setLoading, setError, userData.name, token);
    }
  }, [userData]);

  const closeModal = (event) => {
    // Fechar o modal quando o 'X' for clicado ou quando o modal for clicado fora
    if (event.target === document.getElementById("modal-overlay")) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    // Adiciona o evento de clique na janela para fechar o modal
    window.addEventListener("click", closeModal);

    // Cleanup do evento quando o componente for desmontado
    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, []);

  const logout = () => {
    handleLogout(navigate); // Executa a função de logout
    setToken(null); // Atualiza o estado do token
  };

  const headerProps = {
    logo: logo,
    pag: "Perfil",
    navegateheader: "/home",
    nome: "Home",
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Header key={headerProps.navegateheader} item={headerProps} />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      ></link>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="menu">
          <div className="menu-item" onClick={() => navigate("/")}>
            <i className="fas fa-home"></i> <span>Home</span>
          </div>
          {/* Botão de Logout */}
          {token && (
            <div className="menu-item" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
            </div>
          )}
          {/* Botão de Post */}
          {token && (
            <button
              className="post-button"
              id="menu-button"
              onClick={handleOpenModal}
            >
              Post
            </button>
          )}
        </div>
      </div>
      <div className="container">
        {/* Main Content */}
        <div className="main-content">
          {/* Seção de Perfil */}
          <div className="profile-section">
            {error && <p>{error}</p>}
            {userData ? (
              <>
                <div className="profile-header">
                  <img
                    src={`http://localhost:3000/posts/${userData.background}`}
                    alt="Background"
                    className="background-image"
                  />
                </div>
                <div className="profile-info">
                  <img
                    src={`http://localhost:3000/posts/${userData.avatar}`}
                    alt="Profile Avatar"
                    className="profile-picture"
                  />
                  <h1 className="profile-name">{userData.name}</h1>
                  <p className="profile-username">@{userData.name}</p>
                  <div className="description">
                    <span>{userData.description}</span>
                  </div>
                  <nav className="nav-tabs">
                    <a href="#">Posts</a>
                  </nav>
                </div>
              </>
            ) : (
              <p>Carregando informações do usuário...</p>
            )}
          </div>

          {/* Formulário de criação de post, somente se o usuário estiver logado */}
          {token && (
            <div className="create-post-profile">
              <textarea
                className="post-input-profile"
                placeholder="O que está acontecendo?"
                rows="2"
              ></textarea>
              <div className="buttonsubmit-profile">
                <button className="post-submit-button-profile">Post</button>
              </div>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <span
                  id="closeEditModalBtn"
                  className="close"
                  onClick={handleCloseModal}
                >
                  &times;
                </span>
                <div className="create-post-profile">
                  <div className="user-avatar-placeholder"></div>
                  <textarea
                    className="post-input"
                    placeholder="O que está acontecendo?"
                    rows="1"
                  ></textarea>
                  <div className="buttonsubmit">
                    <button className="post-submit-button">Post</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo de Posts */}
          {loading && <p>Carregando posts...</p>}
          {error && <p>Erro ao carregar posts: {error}</p>}
          {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}
          {posts.map((post, index) => (
            <Post
              key={index}
              id={post.id}
              userAvatar={post.userAvatar}
              userName={post.userName}
              textContent={post.textContent}
              imageContent={post.imageContent}
              likes={post.likes}
              likedByUser={post.likedByUser}
              token={token}
              setPosts={setPosts}
              navigate={navigate}
            />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar"></div>
      </div>
    </>
  );
}
