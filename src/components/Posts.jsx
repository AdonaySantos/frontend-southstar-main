import React, { useState } from "react";
import "./Posts.css"; // Certifique-se de que o caminho está correto para o seu arquivo CSS
import { toggleLike } from "../functions/toggleLike.jsx";

export default function Post({
  id,
  userAvatar,
  userName,
  textContent,
  imageContent,
  likes,
  setPosts,
  token,
}) {
  // Adicionando o estado para controlar o like
  const [isLiked, setIsLiked] = useState(false);

  // Função para lidar com a mudança de cor do ícone ao clicar
  const handleLikeClick = () => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  
    setIsLiked((prevState) => !prevState);
    toggleLike(id, token, isLiked);
  };
  

  return (
    <div className="post">
      <div className="user-info">
        <div className="user-avatar">
          <img
            src={"http://localhost:3000/posts/" + userAvatar}
            alt={`${userName}'s avatar`}
          />
        </div>
        <div className="post-content">
          <span className="user-name">{userName}</span>
          <p>{textContent}</p>
          <div className="post-images">
            {imageContent && (
              <img
                src={"http://localhost:3000/posts/" + imageContent}
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
          onClick={handleLikeClick}
        >
          {likes}
        </i>
        <i className="fas fa-comment"></i> {/* Ícone para comentários */}
      </div>
    </div>
  );
}
