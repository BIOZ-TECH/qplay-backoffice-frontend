import React from "react";

import "./styles.css";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

    const onGoBackClick = () => {
        navigate('/');
    }

  return (
    <Card className="error-404-card">
        <div className="info-container">
            <div className="info">
            <h1>PÁGINA NO ENCONTRADA</h1>
            <p>No se ha encontrado la página que solicitó</p>
            <button
            className="go-back-btn"
            onClick={onGoBackClick}>
                Volver
            </button>
            </div>
        </div>
        <div className="image-404" style={{ backgroundImage: 'url(/404.jpg)' }}></div>
    </Card>
  );
}

export default Error404;