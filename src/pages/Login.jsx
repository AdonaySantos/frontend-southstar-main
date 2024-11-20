import axios from "axios";
import { useState } from "react";
import "../static/Login.css";
import logo from '../assets/sroxo.ico'
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          name,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        setMessage(response.data.message);
        navigate("/");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(
        "Erro ao fazer login: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  const headerProps = {
    logo: logo,
    pag: "",
    navegateheader: "/cadastro",
    nome: "Cadastro",
  };

  return (
    <>
      <Header key={headerProps.navegateheader} item={headerProps} />
      <body>
        <div className="main-login">
          <div className="left-login">
            <h1>Faça login :) <br></br> E entre para o nosso time!</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="right-login">
              <div className="card-login">
                <h1>Login</h1>
                <div className="textfield">
                  <label htmlFor="usuario">Usuário</label>
                  <input
                    type="text"
                    name="usuario"
                    placeholder="Usuário"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  />
                </div>
                <div className="recall-forget">
                  <label>
                    <input type="checkbox" />
                    Lembre de mim
                  </label>
                  <a href="/forgot-password">Esqueceu a senha?</a>
                </div>
                <button htmlFor="button-login" className="button-login">Entrar</button>
                <div className="cadastrar-link">
                  <p>
                    Não tem uma conta? <a href="/cadastro">Registrar</a>
                  </p>
                </div>
                {message && <p className="message-login">{message}</p>}
              </div>
            </div>
          </form>
        </div>
      </body >
    </>
  );
}
