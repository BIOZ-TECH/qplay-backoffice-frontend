import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

import "./styles.css";
import ERROR_401_STRINGS from "../../../resources/strings/error-401";
import { removeUserInformation } from "../../../helpers";

const Error401 = () => {
    const navigate = useNavigate();

    useEffect(() => {
      removeUserInformation();
    }, [])
    

    const onGoBackClick = () => {
        navigate('/');
    }

  return (
    <Card className="error-card">
        <div className="info-container">
            <div className="info">
            <h1>{ ERROR_401_STRINGS.TITLE }</h1>
            <p>{ ERROR_401_STRINGS.DESCRIPTION }</p>
            <button
            className="go-back-btn"
            onClick={onGoBackClick}>
                { ERROR_401_STRINGS.GO_BACK }
            </button>
            </div>
        </div>
        <div className="image-401" style={{ backgroundImage: 'url(/401.jpg)' }}></div>
    </Card>
  );
}

export default Error401;