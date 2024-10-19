import axios from "axios";
import { useState } from "react";
import "../static/Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar-main.onrender.com/login",
        {
          name,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        "Erro ao fazer login: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <body>
        <div className="main-login">
          <div className="left-login">
            <h1>Faça login :) <br></br> E entre para o nosso time!</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="right-login">
              <div class="card-login">
                <h1>Login</h1>
                <div className="textfield">
                  <label for="usuario">Usuário</label>
                  <input
                    type="text"
                    name="usuario"
                    placeholder="Usuário"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="textfield">
                  <label for="senha">Senha</label>
                  <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="recall-forget">
                  <label>
                    <input type="checkbox" />
                    Lembre de mim
                  </label>
                  <a href="/forgot-password">Esqueceu a senha?</a>
                </div>
                <button class="button-login">Entrar</button>
                <div className="cadastrar-link">
                  <p>
                    Não tem uma conta? <a href="/cadastro">Registrar</a>
                  </p>
                </div>
                {message && <p>{message}</p>}
              </div>
            </div>
          </form>
        </div>
      </body >
    </>
  );
}
