export const fetchUserPosts = async (setPosts, setLoading, setError, userName, token) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/user/${userName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ); // Certifique-se de que o backend está rodando no localhost:3000
      if (!response.ok) {
        throw new Error('Erro ao buscar os posts');
      }
      const data = await response.json();
      setPosts(data); // Define os posts no estado
    } catch (error) {
      setError(error.message); // Define a mensagem de erro no estado
    } finally {
      setLoading(false); // Indica que a requisição foi concluída
    }
  };
  