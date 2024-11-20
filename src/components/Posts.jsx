import React, { useState, useEffect } from "react";
import "./Posts.css"; // Certifique-se de que o caminho está correto para o seu arquivo CSS
import { toggleLike } from "../functions/toggleLike.jsx";

export default function Post({
  id,
  userAvatar,
  userName,
  textContent,
  imageContent,
  likes,
  likedByUser, // Novo campo vindo do backend
  comments,
  token,
  navigate,
}) {
  console.log(likedByUser)
  const commentsLength = comments ? comments.length : 0
  const [isLiked, setIsLiked] = useState(likedByUser); // Inicializar com o valor do backend
  const [likeCount, setLikeCount] = useState(likes); // Inicializar a contagem de likes do backend

  const handleLikeClick = (event) => {
    event.stopPropagation(); // Impede a propagação do evento para o contêiner pai

    // Atualiza a contagem de likes localmente
    setLikeCount((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));

    // Alterna o estado do botão de "like"
    setIsLiked((prevState) => !prevState);

    // Chama a função que sincroniza o estado com o backend
    toggleLike(id, token, !isLiked);
  };

  return (
    <div className="post" onClick={() => navigate(`/post/${id}`)}>
      <div className="user-info">
        <div className="user-avatar">
          <img
            src={`http://localhost:3000/posts/${userAvatar}`}
            alt={`${userName}'s avatar`}
          />
        </div>
        <div className="post-content">
          <span className="user-name">{userName}</span>
          <p>{textContent}</p>
          <div className="post-images">
            {imageContent && (
              <img
                src={`http://localhost:3000/posts/${imageContent}`}
                alt="Post content"
                className="post-image"
              />
            )}
          </div>
        </div>
      </div>

      <div className="post-options">
        <i
          className={`fas fa-thumbs-up ${isLiked ? "liked" : ""}`}
          onClick={handleLikeClick} // Manipulador do clique do like
        >
          {likeCount} {/* Exibe a contagem de likes atualizada */}
        </i>
        <i className="fas fa-comment">
            {commentsLength}
        </i> {/* Ícone para comentários */}
      </div>
    </div>
  );
}
