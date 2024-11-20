import "../static/Home.css";
import Post from "../components/Posts.jsx";
import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import logo from "../assets/favicon.ico";
import { fetchPosts } from "../functions/fetchPosts.jsx";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../functions/handleLogout.jsx";

export default function Home() {
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
    pag: "Página Inicial",
    navegateheader: token ? "/perfil" : "/login",
    nome: token ? "Perfil" : "Entrar",
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
          <div className="menu-item">
            <i className="fas fa-home"></i> <span>Home</span>
          </div>
          {/* Botão de Logout */}
          {token && (
            <div className="menu-item" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
            </div>
          )}
          {token && (
            <div className="menu-item">
              <i className="fas fa-user"></i> <span>Profile</span>
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
          {/* Formulário de criação de post, somente se o usuário estiver logado */}
          {token && (
            <div className="create-post">
              <div className="user-avatar-and-input">
                <div className="user-avatar-placeholder">
                  <img src={"https://backend-southstar-main.onrender.com/posts/useravatar1.png"} />
                </div>
                <div className="user-information">
                  <span className="user-name">Adonay</span>
                  <textarea className="post-input" placeholder="O que está acontecendo?" rows="2"></textarea>
                </div>
              </div>
              <div className="buttonsubmit">
                <button className="post-submit-button">Post</button>
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
                <div className="create-post">
                  <div className="user-avatar-and-input">
                    <div className="user-avatar-placeholder">
                      <img src={"https://backend-southstar-main.onrender.com/posts/useravatar1.png"} />
                    </div>
                    <div className="user-information">
                      <span className="user-name">Adonay</span>
                      <textarea className="post-input" placeholder="O que está acontecendo?" rows="2"></textarea>
                    </div>
                  </div>
                  <div className="buttonsubmit">
                    <button className="post-submit-button">Post</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading && <p>Carregando posts...</p>}
          {error && <p>Erro ao carregar posts: {error}</p>}
          {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}
          {posts.map((post) => (
            <Post
              key={post.id}
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