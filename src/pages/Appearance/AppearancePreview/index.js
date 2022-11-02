import React from "react";

import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Card from '@mui/material/Card';

const AppearancePreview = (props) => {
  const { appName, headerAndButtons, backgrounds, letters, selectableAnswers, logo } = props;
  const { primaryColor: headerAndButtonsBackgroundColor, secondaryColor: headerAndButtonsFontColor } = headerAndButtons;
  const { primaryColor: primaryLettersColor, secondaryColor: overgroundLettersColor } = letters;
  const { primaryColor: backgroundColor, secondaryColor: overgroundColor } = backgrounds;
  const { primaryColor: selectableAnswersBackgroundColor, secondaryColor: selectableAnswersFontColor } = selectableAnswers;


  return (
    <Card className="preview-card">
        <div className="mobile-device" style={{ backgroundColor }}>
          <div className="mobile-header" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor }}>
          <p className="mobile-app-name">{appName}</p>
          </div>
          <div className="app-body">
          <div className="mobile-question-card" style={{ backgroundColor: overgroundColor }}>
            <p  style={{ color: primaryLettersColor }}>¿Este es el logo de la aplicación?</p>
            <img className="mx-auto" src={logo} />
          </div>
          <div className="mobile-answers">
          <div className="mobile-answer" style={{ backgroundColor: selectableAnswersBackgroundColor, color: selectableAnswersFontColor }}>No</div>
          <div className="mobile-answer" style={{ backgroundColor: selectableAnswersBackgroundColor, color: selectableAnswersFontColor }}>Puede ser</div>
          <div className="mobile-answer" style={{ backgroundColor: selectableAnswersBackgroundColor, color: selectableAnswersFontColor }}>Si</div>
          <div className="mobile-answer" style={{ backgroundColor: selectableAnswersBackgroundColor, color: selectableAnswersFontColor }}>No sé</div>
          </div>
          <div className="mobile-progress-bar">
            <div className="progress-bar">
              <div className="completed-progress" style={{ backgroundColor: headerAndButtonsBackgroundColor }}></div>
              <div className="remaining-progress" style={{ backgroundColor: overgroundLettersColor }}></div>
            </div>
            <div className="answer-progress" style={{ color: overgroundLettersColor }}>3/5</div>
            </div>
          </div>
        </div>
    </Card>
  );
}

export default AppearancePreview;