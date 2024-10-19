import React, { useState } from "react";
import "../static/Cadastro.css";
import axios from "axios";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar-main.onrender.com/register", // Verifique se essa URL está correta
        {
          name,
          password,
        }
      );
      setMessage(response.data.message); // Mensagem de sucesso
    } catch (error) {
      // Verifique se error.response existe antes de acessar data.message
      setMessage("Erro ao cadastrar: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="main-cadastro">
        <form onSubmit={handleSubmit}>
          <div className="left-cadastro">
            <div className="card-cadastro">
              <h1>Cadastro</h1>
              <div className="textfield">
                <label htmlFor="usuario">Usuário</label>
                <input
                  type="text"
                  name="usuario"
                  placeholder="Usuário"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="textfield">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="terms">
                <input type="checkbox" required />
                <label>
                  Eu aceito os <a href="#">termos e condições</a>
                </label>
              </div>
              <button className="button-cadastro" type="submit">
                Cadastrar
              </button>
              {message && <p className="message">{message}</p>}
              <div className="login-link">
                <p>
                  Já tem uma conta? <a href="/login">Faça login</a>
                </p>
              </div>
            </div>
          </div>
        </form>
        <div className="right-cadastro">
          <h1>Se cadastre :)<br /> E entre para o nosso time!</h1>
        </div>
      </div>
    </>
  );
}
