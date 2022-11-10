import React, { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import LOGIN_STRINGS from "../../resources/strings/login";
import ROUTES from "../../resources/routes";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import userServices from "../../services/login";
import { getRedirectBasedOnResponseStatus, setUserToken } from "../../helpers/index.js";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: {
      ref: createRef(),
      value: '',
      error: null,
    },
    password: {
      ref: createRef(),
      value: '',
      error: null,
    },
    error: null,
  });
  const { email, password } = credentials;

  const logIn = () => {
    userServices.logIn(email.value, password.value)
      .then((response) => {

        if (response?.status !== 200) {   
          throw { response };       
        }

        setUserToken(response?.data);
        navigate(ROUTES.CATEGORIES);
    })
    .catch((e) => {
      const { response } = e;

      if (response?.status === 404
        && response?.data === LOGIN_STRINGS.LOG_IN_ERROR) {
        setCredentials({
          ...credentials,
          error: LOGIN_STRINGS.INVALID_CREDENTIALS,
        });          
      } else {
        navigate(
          getRedirectBasedOnResponseStatus(response),
        );
      }
    });
  }

  const handleLogInButtonClick = () => {
    let invalidCredentials = false;
  
    if (!email.value || !email.value.trim()) {
      invalidCredentials = true;
      setCredentials({
        ...credentials,
        email: {
          ...email,
          error: LOGIN_STRINGS.INVALID_EMAIL,
        },
      });
    }

    if (!password.value || !password.value.trim()) {
      invalidCredentials = true;
      setCredentials({
        ...credentials,
        password: {
          ...password,
          error: LOGIN_STRINGS.INVALID_PASSWORD,
        },
      });
    }

    if (!invalidCredentials) {
      logIn();
    }
  }

  return (
    <Card className="login-card">
      <form>
        <img className="logo" src="/logo.png" />
      
        <EmailInput
          credentials={credentials}
          setCredentials={setCredentials}
          logIn={logIn}
        />
        <PasswordInput
          credentials={credentials}
          setCredentials={setCredentials}
          logIn={logIn}
        />

        <a className="forgot-password">{ LOGIN_STRINGS.FORGOT_PASSWORD }</a>
      
        { credentials.error
          && <div className="login-error">
              { credentials.error }
            </div>
        }
      
        <button
          className="btn-login"
          type="button"
          onClick={handleLogInButtonClick}
        >
          <FontAwesomeIcon className="icon" icon={faUser} />
          <p>{ LOGIN_STRINGS.LOG_IN }</p>
        </button>
      </form>
    </Card>
  );
}

export default Login;