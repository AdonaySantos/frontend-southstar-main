import axios from "axios";
import { useState } from "react";
import "../static/ForgotPassword.css";
import logo from '../assets/sroxo.ico'
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-southstar.onrender.com",
        {
          name,
        }
      );
      setMessage(`Senha: ${response.data.password}`);
    } catch (error) {
      setMessage(
        "Erro ao recuperar senha: " +
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
        <div className="main-recovery">
          <div className="left-recovery">
            <h1>Recupere sua senha ;) <br></br> E volte a acessar sua conta!</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="right-recovery">
              <div className="card-recovery">
                <h1>Recuperar Senha</h1>
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
                <button type="submit" className="button-recovery">Recuperar</button>
                {message && <p className="message">{message}</p>}
                <div className="cadastrar-link">
                  <p>
                    Não tem uma conta? <a href="/cadastro">Registrar</a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </body>
    </>
  );
}