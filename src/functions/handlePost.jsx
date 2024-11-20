import axios from "axios";

export const handlePost = async (textContent, imageFile, token, setError, setPosts) => {
  if (!token) {
    setError("Token de autenticação não fornecido.");
    return;
  }
  if (!textContent && !imageFile) {
    setError("O post deve conter texto ou imagem.");
    return;
  }

  const formData = new FormData();
  formData.append("textContent", textContent);
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await axios.post("http://localhost:3000/posts", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Se o post for bem-sucedido, atualize a lista de posts
    setPosts((prevPosts) => { return [response.data.post, ...prevPosts]});
    setError(null);
  } catch (error) {
    // Caso ocorra um erro, define a mensagem de erro
    setError(
      error.response ? error.response.data.message : "Erro ao criar o post"
    );
  }
};
