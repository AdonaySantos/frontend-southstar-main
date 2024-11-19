import Post from "../components/Posts.jsx";
import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import logo from "../assets/favicon.ico";
import { fetchPosts } from "../functions/fetchPosts.jsx";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../functions/handleLogout.jsx";
import "../static/Perfil.css";

export default function Perfil() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Gerencia o token no estado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(setPosts, setLoading);

    const closeModal = (event) => {
      // Fechar o modal quando o 'X' for clicado ou quando o modal for clicado fora
      if (event.target === document.getElementById("modal-overlay")) {
        setIsModalOpen(false);
      }
    };

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
            <div className="profile-header">
              <img
                src="background-cat-image.jpg"
                alt="Background Image"
                className="background-image"
              />
            </div>
            <div className="profile-info">
              <img
                src="profile-picture.jpg"
                alt="Profile Picture"
                className="profile-picture"
              />
              <h1 className="profile-name">Edy</h1>
              <p className="profile-username">@CodinomeEdy</p>
              <div className="profile-details">
                <p>⚡ 18y</p>
                <p>♎ Libra</p>
                <p>🎮 Coisas Geek</p>
              </div>
              <div className="location-info">
                <span>📍 São Paulo, Brasil</span>
                <a
                  href="https://instagram.com/edy.silvx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
              <p className="joined-date">Ingressou em setembro de 2020</p>
              <div className="followers-info">
                <span>47 Seguindo</span>
                <span>4 Seguidores</span>
              </div>
              <nav className="nav-tabs">
                <a href="#">Posts</a>
              </nav>
            </div>
          </div>

          {/* Formulário de criação de post, somente se o usuário estiver logado */}
          {token && (
            <div className="create-post-profile">
              <div className="user-avatar-placeholder"></div>{" "}
              {/* Avatar estático */}
              <textarea
                className="post-input"
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
              token={token}
              setPosts={setPosts}
            />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="trending">
            <h3>What's happening</h3>
            <div className="trending-item">
              <p>Music · Trending</p>
              <p className="font-bold">Liam Payne</p>
              <p>
                Trending with <span className="hashtag">#OneDirection</span>
              </p>
            </div>
          </div>
          <div className="who-to-follow">
            <h3>Who to follow</h3>
            <div className="follow-item">
              <div className="follow-info">
                <div className="user-avatar"></div>
                <span>adonay</span>
              </div>
              <button className="follow-button">Follow</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
