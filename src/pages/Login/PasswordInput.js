import React from "react";
import { TextField } from "@mui/material";

import LOGIN_STRINGS from "../../resources/strings/login";
import { checkIfEnterIsPressed } from "../../helpers";

const PasswordInput = (props) => {
  const { credentials, setCredentials, logIn } = props;
  const { email, password } = credentials;

  const handlePasswordChange = (e) => {
    setCredentials({
        ...credentials,
        password: {
            ...password,
            value: e.target.value,
            error: null,
        },
        error: null,
    });
  }

  const handlePasswordKeyPress = (e) => {
    if (!checkIfEnterIsPressed(e)) {
        return;
    }

    if (!email.value?.trim()) {
        email.ref.current.children[0].focus();
      } else if(!!password.value?.trim()) {
        logIn();
      }
  }

  return (
    <TextField
      ref={password.ref}
      id="password"
      className="password"
      variant="outlined"
      label={LOGIN_STRINGS.PASSWORD}
      type="password"
      value={password.value}
      onChange={handlePasswordChange}
      onKeyDown={handlePasswordKeyPress}
      autoComplete="current-password"
      error={!!password.error}
      helperText={password.error}
    />
  );
}

export default PasswordInput;