import React from "react";

import "./styles.css";
import { Card, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {

  return (
    <Card className="login-card">
        <img src="/logo.png" />
           <TextField id="username" label="Usuario" variant="outlined"
          className="username"/>
               <TextField id="password" label="Contraseña" variant="outlined"
          className="password"/>
          <a className="forgot-password">Olvide mi contraseña</a>
          <button
          className="btn-login"
          type="button"
        >
          <FontAwesomeIcon className="icon" icon={faUser} />
          <p>Iniciar sesión</p>
        </button>
    </Card>
  );
}

export default Login;