import axios from "axios";

export async function fetchUserData(token, setUserData, setError) {
  if (!token) {
    setError("Usuário não autenticado");
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUserData(response.data);
  } catch (error) {
    console.error("Erro ao buscar informações do usuário:", error);
    setError(error.response?.data?.message || "Erro ao buscar usuário");
  }
}
