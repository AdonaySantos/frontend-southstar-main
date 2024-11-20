export const fetchComments = async (postId, token, commentText, setComments) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ textContent: commentText }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao enviar comentário");
      }
  
      const newComment = await response.json();
  
      // Atualiza a lista de comentários, adicionando o novo comentário
      setComments((prevComments) => [...prevComments, newComment]);
  
      return newComment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  