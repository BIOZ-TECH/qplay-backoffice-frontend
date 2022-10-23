import React from "react";

import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Card from '@mui/material/Card';

const AppearancePreview = (props) => {
  const { appName, header, appBackground, complementaryLetters, button, logo, inputText } = props;
  const { primaryColor: headerBackgroundColor, secondaryColor: headerFontColor } = header;
  const { primaryColor: primaryComplementaryLettersColor, secondaryColor: secondaryComplementaryLettersColor } = complementaryLetters;
  const { primaryColor: buttonBackgroundColor, secondaryColor: buttonFontColor } = button;
  const { primaryColor: inputTextFontColor, secondaryColor: inputTextHintColor, tertiaryColor: inputTextFocusColor } = inputText;

  console.log(props);

  return (
    <Card className="preview-card">
        <div className="mobile-device" style={{ backgroundColor: appBackground }}>
          <div className="mobile-header" style={{ backgroundColor: headerBackgroundColor, color: headerFontColor }}>
          <p className="mobile-app-name">{appName}</p>
          </div>
          <div className="app-body">
          <div className="mobile-question-card">
            <p  style={{ color: primaryComplementaryLettersColor }}>¿Este es el logo de la aplicación?</p>
            <img className="mx-auto" src={logo} />
          </div>
          <div className="mobile-answers">
          <div className="mobile-answer" style={{ backgroundColor: buttonBackgroundColor, color: buttonFontColor }}>No</div>
          <div className="mobile-answer" style={{ backgroundColor: buttonBackgroundColor, color: buttonFontColor }}>Puede ser</div>
          <div className="mobile-answer" style={{ backgroundColor: buttonBackgroundColor, color: buttonFontColor }}>Si</div>
          <div className="mobile-answer" style={{ backgroundColor: buttonBackgroundColor, color: buttonFontColor }}>No sé</div>
          </div>
          <div className="mobile-progress-bar">
            <div className="progress-bar">
              <div className="completed-progress" style={{ backgroundColor: headerBackgroundColor }}></div>
              <div className="remaining-progress" style={{ backgroundColor: secondaryComplementaryLettersColor }}></div>
            </div>
            <div className="answer-progress" style={{ color: secondaryComplementaryLettersColor }}>3/5</div>
            </div>
          </div>
        </div>
    </Card>
  );
}

export default AppearancePreview;