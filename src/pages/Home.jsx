// Home.js
import "../static/Home.css";
import Post from '../components/Posts.jsx'; // Certifique-se de que o caminho esteja correto
import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento
  const [error, setError] = useState(null); // Para capturar possíveis erros

  // Função para buscar os posts do backend
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts'); // Substitua pela URL correta do seu backend
      if (!response.ok) {
        throw new Error('Erro ao buscar os posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
      
      {/* Sidebar */}
      <div className="sidebar">
          <div className="menu">
            <div className="menu-item">
              <i className="fas fa-home"></i> <span>Home</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-search"></i> <span>Explore</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-bell"></i> <span>Notifications</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-envelope"></i> <span>Messages</span>
            </div>
            <div className="menu-item">
              <i className="fas fa-user"></i> <span>Profile</span>
            </div>
            <button className="post-button" id="menu-button">Post</button>
          </div>
        </div>
      <div className="container">


        {/* Main Content */}
        <div className="main-content">
          {loading && <p>Loading posts...</p>}
          {error && <p>{error}</p>}
          {posts.map((post, index) => (
            <Post
              key={index}
              userAvatar={post.userAvatar}
              userName={post.userName}
              textContent={post.textContent}
              imageContent={post.imageContent}
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
                <span>Eddie Trunk</span>
              </div>
              <button className="follow-button">Follow</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
