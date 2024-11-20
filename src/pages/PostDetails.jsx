import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/favicon.ico";
import Header from "../components/Header";
import { toggleLike } from "../functions/toggleLike";
import { fetchComments } from "../functions/fetchComments"; // Função importada
import "../static/PostDetails.css";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // Estado para o comentário
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controle de envio

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLikeCount(data.likes);
        setIsLiked(data.likedByUser);
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar post:", error));
  }, [id, token]);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:3000/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => setUser(data)) // Armazena as informações do usuário no estado
        .catch((error) =>
          console.error("Erro ao buscar informações do usuário:", error)
        );
    }
    console.log(user);
  }, [token]);

  const handleLikeClick = () => {
    if (!post) return;

    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    setIsLiked((prevState) => !prevState);
    toggleLike(id, token, !isLiked);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/login");
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setIsSubmitting(true); // Inicia o envio do comentário
      fetchComments(id, token, newComment, setComments)
        .then(() => {
          setNewComment(""); // Limpa o campo de comentário após o envio
          setIsSubmitting(false); // Finaliza o envio

          // Recarregar os comentários após o envio
          fetch(`http://localhost:3000/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((response) => response.json())
            .then((data) => {
              setComments(data.comments || []);
            })
            .catch((error) =>
              console.error("Erro ao buscar os comentários:", error)
            );
        })
        .catch((error) => {
          setIsSubmitting(false); // Finaliza o envio, mesmo em caso de erro
          alert("Erro ao enviar comentário: " + error.message);
        });
    } else {
      alert("O comentário não pode estar vazio.");
    }
  };

  const headerProps = {
    logo: logo,
    pag: "Post",
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
                {likeCount}
              </i>
            </div>
          </div>

          <nav className="nav-tabs-post">
            <a href="">Comentários</a>
          </nav>

          {/* Formulário para criação de comentário */}
          {token && user && (
            <div className="create-post">
              <div className="user-avatar-and-input">
                <div className="user-avatar-placeholder">
                  <img
                    src={`http://localhost:3000/posts/${user.avatar}`} // Usa o avatar do usuário
                    alt={`${user.name}'s avatar`}
                  />
                </div>
                <div className="comment-information">
                  <div className="comment-content">
                    <span className="comment-name">{user.name}</span>
                    <textarea
                      className="comment-input"
                      placeholder="O que você acha?"
                      rows="2"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)} // Atualiza o estado com o texto do comentário
                    ></textarea>
                  </div>
                  <div className="comment-buttonsubmit">
                    <button
                      className="comment-submit-button"
                      onClick={handleCommentSubmit}
                      disabled={isSubmitting} // Desabilita o botão durante o envio
                    >
                      {isSubmitting ? "Enviando..." : "Comentar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Renderizar comentários */}
          <div className="comments">
            {comments.length === 0 ? (
              <p>Sem comentários ainda.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="post">
                  <div className="user-info">
                    <div className="user-avatar">
                      <img
                        src={`http://localhost:3000/posts/${comment.userAvatar}`}
                        alt={`${comment.userName}'s avatar`}
                      />
                    </div>
                    <div className="post-content">
                      <span className="user-name">{comment.userName}</span>
                      <p>{comment.textContent}</p>
                      <div className="post-images">
                        {comment.imageContent && (
                          <img
                            src={`http://localhost:3000/posts/${comment.imageContent}`}
                            alt="Comment content"
                            className="post-image"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="right-sidebar"></div>
      </div>
    </>
  );
}
