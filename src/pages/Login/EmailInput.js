import React from "react";
import { TextField } from "@mui/material";

import LOGIN_STRINGS from "../../resources/strings/login";
import { checkIfEnterIsPressed } from "../../helpers";

const EmailInput = (props) => {
  const { credentials, setCredentials, logIn } = props;
  const { email, password } = credentials;

  const handleEmailChange = (e) => {
    setCredentials({
        ...credentials,
        email: {
            ...email,
            value: e.target.value,
            error: null,
        },
        error: null,
    });
  }

  const handleEmailKeyPress = (e) => {
    if (!checkIfEnterIsPressed(e)) {
        return;
    }
    
    if(!!email.value?.trim()) {
      password.ref.current.children[0].focus();
    } else if(!!password.value?.trim()) {
      logIn();
    }
  }

  return (
    <TextField
      ref={email.ref}
      id="email"
      className="email-or-username"
      variant="outlined"
      label={LOGIN_STRINGS.EMAIL}
      value={email.value}
      onChange={handleEmailChange}
      onKeyDown={handleEmailKeyPress}
      autoComplete="email"
      error={!!email.error}
      helperText={email.error}
    />
  );
}

export default EmailInput;