import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

import "./styles.css";
import ERROR_500_STRINGS from "../../../resources/strings/error-500";

const Error500 = () => {
    const navigate = useNavigate();

    const onGoBackClick = () => {
        navigate('/');
    }

  return (
    <Card className="error-500-card">
        <div className="info-container">
            <div className="info">
            <h1>{ ERROR_500_STRINGS.TITLE }</h1>
            <p>{ ERROR_500_STRINGS.DESCRIPTION }</p>
            <button
            className="go-back-btn"
            onClick={onGoBackClick}>
                { ERROR_500_STRINGS.GO_BACK }
            </button>
            </div>
        </div>
        <div className="image-500" style={{ backgroundImage: 'url(/500.jpg)' }}></div>
    </Card>
  );
}

export default Error500;