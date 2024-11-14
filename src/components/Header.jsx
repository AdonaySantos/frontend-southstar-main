import "./Header.css";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <div className="logo">
        <img src={props.item.logo} alt="Logo" />
      </div>
      <div className="title">
        <h1>{props.item.pag}</h1>
      </div>
      <div className="links-nav">
        <Link to={props.item.navegateheader}>{props.item.nome}</Link>
      </div>
    </header>
  );
}