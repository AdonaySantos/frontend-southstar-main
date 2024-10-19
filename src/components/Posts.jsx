// Post.js
import React from 'react';
import './Posts.css'; // Certifique-se de que o caminho está correto para o seu arquivo CSS

export default function Post({ userAvatar, userName, textContent, imageContent }) {
  return (
    <div className="post">
      <div className="user-info">
        <div className="user-avatar">
          <img src={userAvatar} alt={`${userName}'s avatar`} />
        </div>
        <span className="user-name">{userName}</span>
      </div>
      <div className="post-content">
        <p>{textContent}</p>
        {imageContent && <img src={imageContent} alt="Post content" className="post-image" />}
      </div>
      <div className="post-options">
        <i className="fas fa-thumbs-up"></i> {/* Ícone para likes */}
        <i className="fas fa-comment"></i> {/* Ícone para comentários */}
        <i className="fas fa-share"></i> {/* Ícone para compartilhar */}
      </div>
    </div>
  );
}
