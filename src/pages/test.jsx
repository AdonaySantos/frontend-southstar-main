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
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts(setPosts, setLoading);
    }, []);

    useEffect(() => {
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
        handleLogout(navigate);
        setToken(null);
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
                    <div className="menu-item">
                        <i className="fas fa-search"></i> <span>Explore</span>
                    </div>
                    {/* Botão de Logout */}
                    {token && (
                        <div className="menu-item" onClick={logout}>
                            <i className="fas fa-sign-out-alt"></i>{" "}
                            <span>Logout</span>
                        </div>
                    )}
                    <div className="menu-item">
                        <i className="fas fa-envelope"></i>{" "}
                        <span>Messages</span>
                    </div>
                    <div className="menu-item">
                        <i className="fas fa-user"></i> <span>Profile</span>
                    </div>
                    {/* Botão de Post */}
                    {token && (
                        <button
                            className="post-button"
                            id="menu-button"
                            onClick={handleOpenModal} // Abre o modal ao clicar
                        >
                            Post
                        </button>
                    )}
                </div>
            </div>
            
            <div className="container">
                {/* Main Content */}
                <div className="main-content">
                    {/* Formulário de criação de post */}
                    <div className="create-post">
                        <div className="user-avatar-placeholder"></div>{" "}
                        {/* Avatar estático */}
                        <textarea
                            className="post-input"
                            placeholder="O que está acontecendo?"
                            rows="3"
                        ></textarea>
                        <div className="buttonsubmit">
                        <button className="post-submit-button">Post</button>
                        </div>
                    </div>
                    
                    {/* Modal */}
                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <span id="closeEditModalBtn" className="close" onClick={handleCloseModal} >
                                    &times;
                                </span>
                                <div className="create-post">
                                    <div className="user-avatar-placeholder"></div>
                                    <textarea
                                        className="post-input"
                                        placeholder="O que está acontecendo?"
                                        rows="3"
                                    ></textarea>
                                    <div className="buttonsubmit">
                                        <button className="post-submit-button">
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-bar"
                    />
                    <div className="trending">
                        <h3>What's happening</h3>
                        <div className="trending-item">
                            <p>Music · Trending</p>
                            <p className="font-bold">Liam Payne</p>
                            <p>
                                Trending with{" "}
                                <span className="hashtag">#OneDirection</span>
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