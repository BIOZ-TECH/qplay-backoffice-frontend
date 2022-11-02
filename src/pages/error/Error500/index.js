import React from "react";

import "./styles.css";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
    const navigate = useNavigate();

    const onGoBackClick = () => {
        navigate('/');
    }

  return (
    <Card className="error-500-card">
        <div className="info-container">
            <div className="info">
            <h1>ERROR DE SERVIDOR</h1>
            <p>No te preocupes, siempre existe una forma de volver atrás</p>
            <button
            className="go-back-btn"
            onClick={onGoBackClick}>
                Volver
            </button>
            </div>
        </div>
        <div className="image-500" style={{ backgroundImage: 'url(/500.jpg)' }}></div>
    </Card>
  );
}

export default Error500;