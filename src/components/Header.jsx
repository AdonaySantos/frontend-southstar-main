import "./Header.css";
import logo from "../assets/favicon.ico";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="title">
          <h1>Página Inicial</h1>
        </div>
        <div className="links-nav">
          <Link to="/login">Entrar</Link>
        </div>
      </header>
    </>
  );
}
