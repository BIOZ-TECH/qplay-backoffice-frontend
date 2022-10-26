import React from "react";

import "./styles.css";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error401 = () => {
    const navigate = useNavigate();

    const onGoBackClick = () => {
        navigate('/');
    }

  return (
    <Card className="error-card">
        <div className="info-container">
            <div className="info">
            <h1>ACCESO NO AUTORIZADO</h1>
            <p>No te preocupes, siempre existe una forma de volver atrás</p>
            <button
            className="go-back-btn"
            onClick={onGoBackClick}>
                Volver
            </button>
            </div>
        </div>
        <div className="image-401" style={{ backgroundImage: 'url(/401.jpg)' }}></div>
    </Card>
  );
}

export default Error401;