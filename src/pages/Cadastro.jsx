import React, { useState } from "react";
import "../static/Cadastro.css";
import axios from "axios";
import logo from '../assets/sroxo.ico'
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register", // Verifique se essa URL está correta
        {
          name,
          password,
        }
      );
      setMessage(response.data.message); // Mensagem de sucesso
      navigate("/login")
    } catch (error) {
      // Verifique se error.response existe antes de acessar data.message
      setMessage("Erro ao cadastrar: " + (error.response?.data?.message || error.message));
    }
  };

  const headerProps = {
    logo: logo,
    pag: "",
    navegateheader: "/login",
    nome: "Entrar",
  };

  return (
    <>
      <Header key={headerProps.navegateheader} item={headerProps} />
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
              {message && <p className="message-login">{message}</p>}
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
