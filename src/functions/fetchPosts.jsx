export const fetchPosts = async (setPosts, setLoading) => {
    try {
      const response = await fetch('https://backend-southstar-main.onrender.com/posts'); // Substitua pela URL correta do seu backend
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