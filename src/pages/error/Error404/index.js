import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

import "./styles.css";
import ERROR_404_STRINGS from "../../../resources/strings/error-404";

const Error404 = () => {
    const navigate = useNavigate();

    const onGoBackClick = () => {
        navigate('/');
    }

  return (
    <Card className="error-404-card">
        <div className="info-container">
            <div className="info">
            <h1>{ ERROR_404_STRINGS.TITLE }</h1>
            <p>{ ERROR_404_STRINGS.DESCRIPTION }</p>
            <button
            className="go-back-btn"
            onClick={onGoBackClick}>
                { ERROR_404_STRINGS.GO_BACK }
            </button>
            </div>
        </div>
        <div className="image-404" style={{ backgroundImage: 'url(/404.jpg)' }}></div>
    </Card>
  );
}

export default Error404;