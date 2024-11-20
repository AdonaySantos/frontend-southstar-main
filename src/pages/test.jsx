import "../static/Home.css";
import Post from "../components/Posts.jsx";
import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import logo from "../assets/favicon.ico";
import { fetchPosts } from "../functions/fetchPosts.jsx";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../functions/handleLogout.jsx";
import { handlePost } from "../functions/handlePost.jsx"; // Importando a função

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken")); // Gerencia o token no estado
    const [user, setUser] = useState(null); // Estado para armazenar informações do usuário
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postContent, setPostContent] = useState(""); // Estado para armazenar o texto do post
    const [image, setImage] = useState(null); // Estado para armazenar a imagem
    const navigate = useNavigate();

    // Função para buscar informações do usuário logado
    useEffect(() => {
        if (token) {
            fetch(`http://localhost:3000/user`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => setUser(data)) // Armazena as informações do usuário no estado
                .catch((error) =>
                    console.error(
                        "Erro ao buscar informações do usuário:",
                        error
                    )
                );
        }
        fetchPosts(setPosts, setLoading, setError, token);

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
    }, [token]);

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

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            handlePost(postContent, image, token, setError, setPosts);
            setPostContent(""); // Limpa o campo de texto após o envio
            setImage(null); // Limpa a imagem após o envio
            handleCloseModal(); // Fecha o modal
        } else {
            setError("O post deve ter conteúdo.");
        }
    };

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
                            <i className="fas fa-sign-out-alt"></i>{" "}
                            <span>Logout</span>
                        </div>
                    )}
                    {token && (
                        <div
                            className="menu-item"
                            onClick={() => navigate("/perfil")}
                        >
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
                    {token && user && (
                        <div className="create-post">
                            <div className="user-avatar-and-input">
                                <div className="user-avatar-placeholder">
                                    <img
                                        src={`http://localhost:3000/posts/${user.avatar}`} // Usa o avatar do usuário
                                        alt={`${user.name}'s avatar`}
                                    />
                                </div>
                                <div className="user-information">
                                    <span className="user-name">
                                        {user.name}
                                    </span>{" "}
                                    {/* Usa o nome do usuário */}
                                    <textarea
                                        className="post-input"
                                        placeholder="O que está acontecendo?"
                                        rows="2"
                                        value={postContent}
                                        onChange={(e) =>
                                            setPostContent(e.target.value)
                                        }
                                    ></textarea>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className="buttonsubmit">
                                <button
                                    className="post-submit-button"
                                    onClick={handlePostSubmit}
                                >
                                    Post
                                </button>
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
                                <div className="create-post-modal">
                                    <div className="user-avatar-and-input">
                                        <div className="user-avatar-placeholder">
                                            <img
                                                src={`http://localhost:3000/posts/${user.avatar}`}
                                            />
                                        </div>
                                        <div className="user-information">
                                            <span className="user-name">
                                                {user.name}
                                            </span>
                                            <textarea
                                                className="post-input"
                                                placeholder="O que está acontecendo?"
                                                rows="2"
                                                value={postContent}
                                                onChange={(e) =>
                                                    setPostContent(
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="buttonsubmit">
                                        <button
                                            className="post-submit-button"
                                            onClick={handlePostSubmit}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading && <p>Carregando posts...</p>}
                    {error && <p>Erro ao carregar posts: {error}</p>}
                    {!loading && posts.length === 0 && (
                        <p>Nenhum post encontrado.</p>
                    )}
                    {posts.map((post) => (
                        <Post
                            key={post.id}
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