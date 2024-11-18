export const handleLogout = (navigate) => {
    localStorage.removeItem("authToken"); // Remove o token de autenticação
    navigate("/login"); // Redireciona para a página de login
};