import React from "react";
import APPEARANCE_STRINGS from "../../../../resources/strings/appearance";

import './styles.css';

const LoginPreview = (props) => {
    const { appName, headerAndButtons, backgrounds, letters, logo } = props;
    const { primaryColor: headerAndButtonsBackgroundColor, secondaryColor: headerAndButtonsFontColor } = headerAndButtons;
    const { primaryColor: primaryLettersColor } = letters;
    const { primaryColor: backgroundColor, secondaryColor: overgroundColor } = backgrounds;

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
                <p style={{ color: primaryLettersColor }}>{ APPEARANCE_STRINGS.LOGIN_PREVIEW.FAKE_USER }</p>
                <div className="base-line" style={{ backgroundColor: headerAndButtonsBackgroundColor }}></div>
              </div>
              <div className="login-input">
                <p style={{ color: headerAndButtonsBackgroundColor }}>{ APPEARANCE_STRINGS.LOGIN_PREVIEW.PASSWORD }</p>
                <div className="base-line" style={{ backgroundColor: headerAndButtonsBackgroundColor }}></div>
              </div>
              <p className="forgot-password-link" style={{ color: headerAndButtonsBackgroundColor }}>{ APPEARANCE_STRINGS.LOGIN_PREVIEW.FORGOT_PASSWORD }</p>
              <div className="login-btn" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor}}>
              { APPEARANCE_STRINGS.LOGIN_PREVIEW.LOG_IN }
              </div>
              <div className="divider">
                <div className="line" style={{ backgroundColor: primaryLettersColor }}></div>
                <p className="or" style={{ color: primaryLettersColor }}>Ó</p>
                <div className="line" style={{ backgroundColor: primaryLettersColor }}></div>
              </div>
              <div className="login-btn" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor}}>
              { APPEARANCE_STRINGS.LOGIN_PREVIEW.SIGN_UP }
              </div>
    </div>
    </div>
    </div>
    </div>
  </div>
  );
}

export default LoginPreview;