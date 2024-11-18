import axios from "axios";

export async function toggleLike(postId, setPosts, token, isLiked) {
  if (!token) {
    alert("Faça login ou crie uma conta para dar likes");
    return;
  }

  // A lógica de like otimista foi movida para o componente Post.jsx.
  // Aqui, apenas fazemos a requisição para o backend.

  try {
    const response = await axios.post(
      `https://backend-southstar-main.onrender.com/like/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Atualiza os posts com base no resultado do backend
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === parseInt(postId) ? { ...post, likes: response.data.likes } : post
      )
    );
  } catch (error) {
    console.error("Erro ao gerenciar like:", error);
    alert(error.response?.data?.message || "Erro ao processar sua solicitação");
  }
}
