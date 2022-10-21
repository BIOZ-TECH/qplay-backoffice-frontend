import React, { createRef, useEffect, useRef, useState } from "react";

import "./styles.css";
import { Card } from "@mui/material";

const QuestionScreen = ({ question }) => {

  return (
<>
<div className="mobile-device">
  <div className="app-body">
  <div className="mobile-question-card">
  <div className="statement">{question.statement}</div>
    {
      question.image
      && (
        <img className="question-statement-image" src={question.image || ''} />
      )
    }
  </div>
  <div className="mobile-answers">
  
  <div className="mobile-answer correct">{question.answers[0]}</div>
        <div className="mobile-answer incorrect">{question.answers[1]}</div>
        <div className="mobile-answer incorrect">{question.answers.length > 2 ? question.answers[2] : ''}</div>
        <div className="mobile-answer incorrect">{question.answers.length === 4 ? question.answers[3] : ''}</div>
  </div>
  </div>
</div>
</>
  );
}

export default QuestionScreen;