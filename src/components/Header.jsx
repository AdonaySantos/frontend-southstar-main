import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header(props) {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Se o scroll for maior que 50px, esconda o título
      setShowTitle(window.scrollY < 20);
    };

    // Adiciona o evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Remove o evento ao desmontar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src={props.item.logo} alt="Logo" />
      </div>
      <div className="title" style={{ display: showTitle ? "block" : "none" }}>
        <h1>{props.item.pag}</h1>
      </div>
      <div className="links-nav">
        <Link to={props.item.navegateheader}>{props.item.nome}</Link>
      </div>
    </header>
  );
}
