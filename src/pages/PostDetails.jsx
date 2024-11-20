import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/favicon.ico";
import Header from "../components/Header";
import { toggleLike } from "../functions/toggleLike";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLikeCount(data.likes); // Definir a contagem de likes do post
        setIsLiked(data.likedByUser); // Definir se o usuário já deu like
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar post:", error));
  }, [id, token]);

  const handleLikeClick = () => {
    if (!post) return;

    // Atualiza a contagem de likes localmente
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

    // Alterna o estado do botão de "like"
    setIsLiked((prevState) => !prevState);

    // Chama a função que sincroniza o estado com o backend
    toggleLike(id, token, !isLiked);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/login");
  };

  const headerProps = {
    logo: logo,
    pag: "Página Inicial",
    navegateheader: token ? "/perfil" : "/login",
    nome: token ? "Perfil" : "Entrar",
  };

  if (loading) return <p>Carregando...</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <>
      <Header key={headerProps.navegateheader} item={headerProps} />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      ></link>

      <div className="sidebar">
        <div className="menu">
          <div className="menu-item" onClick={() => navigate("/")}>
            <i className="fas fa-home"></i> <span>Home</span>
          </div>
          {token && (
            <>
              <div className="menu-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
              </div>
              <div className="menu-item" onClick={() => navigate("/perfil")}>
                <i className="fas fa-user"></i> <span>Profile</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="container">
        <div className="main-content">
          <div className="post">
            <div className="user-info">
              <div className="user-avatar">
                <img
                  src={`http://localhost:3000/posts/${post.userAvatar}`}
                  alt={`${post.userName}'s avatar`}
                />
              </div>
              <div className="post-content">
                <span className="user-name">{post.userName}</span>
                <p>{post.textContent}</p>
                {post.imageContent && (
                  <div className="post-images">
                    <img
                      src={`http://localhost:3000/posts/${post.imageContent}`}
                      alt="Post content"
                      className="post-image"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="post-options">
              <i
                className={`fas fa-thumbs-up ${isLiked ? "liked" : ""}`}
                onClick={handleLikeClick}
              >
                {likeCount} {/* Exibe a contagem de likes atualizada */}
              </i>
            </div>
          </div>
        </div>

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
