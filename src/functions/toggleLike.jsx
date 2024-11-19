import axios from "axios";

export async function toggleLike(postId, token) {
  try {
    const response = await axios.post(
      `http://localhost:3000/like/${postId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Retorna os dados do backend
  } catch (error) {
    console.error('Erro ao processar like:', error);
    throw error; // Lança o erro para ser tratado no componente
  }
}
