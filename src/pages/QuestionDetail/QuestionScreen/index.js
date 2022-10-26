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
      question.permalink
      && (
        <img className="question-statement-image" src={question.permalink || ''} />
      )
    }
  </div>
  <div className="mobile-answers">
  
  <div className="mobile-answer correct">{question.answers[0].description}</div>
        <div className="mobile-answer incorrect">{question.answers[1].description}</div>
        { question.answers.length > 2
          && <div className="mobile-answer incorrect">{question.answers[2].description}</div>
        }
        {question.answers.length === 4
          && <div className="mobile-answer incorrect">{question.answers[3].description}</div>}
        
  </div>
  </div>
</div>
</>
  );
}

export default QuestionScreen;