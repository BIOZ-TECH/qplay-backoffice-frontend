import React, { createRef, useEffect, useRef, useState } from "react";

import "./styles.css";
import { Card, FormControl, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";

const QuestionScreen = ({ question }) => {

  const statementInput = createRef();
  const correctAnswerInput = createRef();
  const firstIncorrectAnswerInput = createRef();
  const secondIncorrectAnswerInput = createRef();
  const thirdIncorrectAnswerInput = createRef();

  const onStatementEditClick = () => {
    statementInput.current.children[0].focus();
  }

  const onCorrectAnswerEditClick = () => {
    correctAnswerInput.current.children[0].focus();
  }

  const onFirstIncorrectAnswerEditClick = () => {
    firstIncorrectAnswerInput.current.children[0].focus();
  }

  const onSecondIncorrectAnswerEditClick = () => {
    secondIncorrectAnswerInput.current.children[0].focus();
  }

  const onThirdIncorrectAnswerEditClick = () => {
    thirdIncorrectAnswerInput.current.children[0].focus();
  }


  return (
<div className="mobile-device">
  <div className="app-body">
  <div className="mobile-question-card">
  <FormControl fullWidth>
          <OutlinedInput
            id="statement-input"
            className="mobile-statement"
            endAdornment={<InputAdornment position="end"><FontAwesomeIcon onClick={onStatementEditClick} className="edit-adornment" icon={faPencil} /></InputAdornment>}
            placeholder="Enunciado de la pregunta"
            multiline
            ref={statementInput}
          />
        </FormControl>
    {
      question.image
      && (
        <img className="question-statement-image" src={question.image || ''} />
      )
    }
  </div>
  <div className="mobile-answers">
  <FormControl fullWidth>
          <OutlinedInput
            id="correct-answer-input"
            className="mobile-answer correct"
            endAdornment={<InputAdornment position="end"><FontAwesomeIcon onClick={onCorrectAnswerEditClick} className="edit-adornment correct" icon={faPencil} /></InputAdornment>}
            placeholder="Respuesta correcta"
            multiline
            ref={correctAnswerInput}
          />
        </FormControl>
        <FormControl fullWidth>
          <OutlinedInput
            id="first-incorrect-answer-input"
            className="mobile-answer incorrect"
            endAdornment={<InputAdornment position="end"><FontAwesomeIcon onClick={onFirstIncorrectAnswerEditClick} className="edit-adornment incorrect" icon={faPencil} /></InputAdornment>}
            placeholder="Respuesta incorrecta"
            multiline
            ref={firstIncorrectAnswerInput}
          />
        </FormControl>
        <FormControl fullWidth>
          <OutlinedInput
            id="second-incorrect-answer-input"
            className="mobile-answer incorrect"
            endAdornment={<InputAdornment position="end"><FontAwesomeIcon onClick={onSecondIncorrectAnswerEditClick} className="edit-adornment incorrect" icon={faPencil} /></InputAdornment>}
            placeholder="Respuesta incorrecta"
            multiline
            ref={secondIncorrectAnswerInput}
          />
        </FormControl>
        <FormControl fullWidth>
          <OutlinedInput
            id="third-incorrect-answer-input"
            className="mobile-answer incorrect"
            endAdornment={<InputAdornment position="end"><FontAwesomeIcon onClick={onThirdIncorrectAnswerEditClick} className="edit-adornment incorrect" icon={faPencil} /></InputAdornment>}
            placeholder="Respuesta incorrecta"
            multiline
            ref={thirdIncorrectAnswerInput}
          />
        </FormControl>
  </div>
  </div>
</div>
  );
}

export default QuestionScreen;
