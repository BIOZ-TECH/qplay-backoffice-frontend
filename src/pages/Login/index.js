import React, { createRef, useEffect, useState } from "react";

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
  const [errorMessages, setErrorMessages] = useState(null);

  const passwordInput = createRef();
  const emailInput = createRef();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessages({
      ...errorMessages,
      incorrectEmail: null,
      incorrectCredentials: null,
    });
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);

    setErrorMessages({
      ...errorMessages,
      incorrectPassword: null,
      incorrectCredentials: null,
    });
  }

  const login = () => {
    userServices.login(email, password)
    .then((res) => {
      switch(res.status) {
        case 200:
          const { token, holderId } = res.data;  
          localStorage.setItem('ACCESS_TOKEN', token);
          localStorage.setItem('HOLDER', holderId);
          
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
            if (e.response && e.response.data === 'User not found') {
              setErrorMessages({
                ...errorMessages,
                incorrectCredentials: 'El correo electrónico o contraseña ingresado es incorrecto',
              });
            } else {
              navigate('/error-404');
            }
            break;
          default:
            navigate('/error-500');
        }
    });
  }

  const onKeyPressPassword = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      if (!email || !email.trim()) {
        emailInput.current.children[0].focus();
      } else if(!(!password || !password.trim())) {
        login();
      }
    }
  }

  const onKeyPressEmail = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      if(!(!email || !email.trim())) {
        passwordInput.current.children[0].focus();

        if(!(!password || !password.trim())) {
          login();
        }
      }
    }
  }

  const onLoginClick = () => {
    let newMessages = null;
    if (!password || !password.trim()) {
      newMessages = {
        ...newMessages,
        incorrectPassword: 'Por favor, ingrese su contraseña',
      };
    }

    if (!email || !email.trim()) {
      newMessages = {
        ...newMessages,
        incorrectEmail: 'Por favor, ingrese su correo electrónico',
      };
    }

    if (!newMessages) {
      login();
    } else {
      setErrorMessages(newMessages);
    }
  }

  return (
    <Card className="login-card">
        <img src="/logo.png" />
           <TextField id="email" label="Correo electrónico" variant="outlined"
          className="username"
          value={email}
          onChange={onEmailChange}
          ref={emailInput}
          onKeyDown={onKeyPressEmail}
          error={!!errorMessages?.incorrectEmail}
        helperText={errorMessages?.incorrectEmail}
          />
               <TextField id="password" label="Contraseña" variant="outlined"
               onChange={onPasswordChange}
               value={password}
               type="password"
          className="password"
          ref={passwordInput}
          onKeyDown={onKeyPressPassword}
          error={!!errorMessages?.incorrectPassword}
          helperText={errorMessages?.incorrectPassword}
          />
          {/*<a className="forgot-password">Olvide mi contraseña</a>*/}
          { errorMessages?.incorrectCredentials
            && <div className="login-error">
              {errorMessages.incorrectCredentials}
              </div>
          }
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