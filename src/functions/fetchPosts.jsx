export const fetchPosts = async (setPosts, setLoading, setError, token) => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3000/posts",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar os posts");
    }
    const data = await response.json();

    // Transformar os dados, se necessário
    const processedData = data.map((post) => ({
      id: post.id,
      userAvatar: post.userAvatar,
      userName: post.userName,
      textContent: post.textContent,
      imageContent: post.imageContent,
      likes: post.likes,
      likedByUser: post.likedByUser, // Incluído o campo do backend
    }));

    setPosts(processedData); // Define os posts no estado
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
