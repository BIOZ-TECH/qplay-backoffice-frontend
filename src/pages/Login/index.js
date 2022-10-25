import React, { useState } from "react";

import "./styles.css";
import { Card, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import userServices from "../../services/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onLoginClick = () => {
    userServices.login(email, password)
    .then((res) => {
      switch(res.status) {
        case 200:
          localStorage.setItem('ACCESS_TOKEN', res.data);

          navigate('/categories');  
          break;
        default:
          navigate('/error-500');
      }
    })
    .catch((e) => {
        switch(e.response.status) {
          case 400:
          case 401:
            navigate('/error-401');
            break;
          case 404:
            navigate('/error-404');
            break;
          default:
            navigate('/error-500');
        }
    });
  }

  return (
    <Card className="login-card">
        <img src="/logo.png" />
           <TextField id="email" label="Correo electrónico" variant="outlined"
          className="username"
          value={email}
          onChange={onEmailChange}
          />
               <TextField id="password" label="Contraseña" variant="outlined"
               onChange={onPasswordChange}
               value={password}
               type="password"
          className="password"/>
          <a className="forgot-password">Olvide mi contraseña</a>
          <button
          className="btn-login"
          type="button"
          onClick={onLoginClick}
        >
          <FontAwesomeIcon className="icon" icon={faUser} />
          <p>Iniciar sesión</p>
        </button>
    </Card>
  );
}

export default Login;