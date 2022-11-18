import { Card } from "@mui/material";
import React, { useState } from "react";

import './styles.css';

const LoginPreview = (props) => {
    const { appName, headerAndButtons, backgrounds, letters, selectableAnswers, logo } = props;
    const { primaryColor: headerAndButtonsBackgroundColor, secondaryColor: headerAndButtonsFontColor } = headerAndButtons;
    const { primaryColor: primaryLettersColor, secondaryColor: overgroundLettersColor } = letters;
    const { primaryColor: backgroundColor, secondaryColor: overgroundColor } = backgrounds;
    const { primaryColor: selectableAnswersBackgroundColor, secondaryColor: selectableAnswersFontColor } = selectableAnswers;

  return (
    <div className="mobile-device">
    <div className="mobile-header" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor }}>
    <p className="mobile-app-name">{appName}</p>
    </div>
    <div className="mobile-body" style={{ backgroundColor }}>
    <div className="app-body login">
    <div className="login-mobile-card" style={{ backgroundColor: overgroundColor }}>
    <img className="image" src={logo}/>
    <div className="form">
    <div className="login-input">
                <p style={{ color: primaryLettersColor }}>MiUsuario</p>
                <div className="base-line" style={{ backgroundColor: headerAndButtonsBackgroundColor }}></div>
              </div>
              <div className="login-input">
                <p style={{ color: headerAndButtonsBackgroundColor }}>Contraseña</p>
                <div className="base-line" style={{ backgroundColor: headerAndButtonsBackgroundColor }}></div>
              </div>
              <p className="forgot-password-link" style={{ color: headerAndButtonsBackgroundColor }}>¿Olvidaste tu contraseña?</p>
              <div className="login-btn" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor}}>
                Iniciar sesión
              </div>
              <div className="divider">
                <div className="line" style={{ backgroundColor: primaryLettersColor }}></div>
                <p className="or" style={{ color: primaryLettersColor }}>Ó</p>
                <div className="line" style={{ backgroundColor: primaryLettersColor }}></div>
              </div>
              <div className="login-btn" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor}}>
                Registrarse
              </div>
    </div>
    </div>
    </div>
    </div>
  </div>
  );
}

export default LoginPreview;