import React, { createRef, useEffect, useRef, useState } from "react";

import "./styles.css";
import { Card, FormControl, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import Answer from "../../../entities/Answer";

const QuestionScreen = ({ question, inputValues, setInputValues }) => {

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

  const onStatementChange = (e) => {
    setInputValues({
      ...inputValues,
      statementInput: e.target.value,
    });
  }

  const onCorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[0] = new Answer({
      id: newAnswers[0]?.id || null,
      description: e.target.value,
      isCorrect: true,
    });

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });
  }

  const onFirstIncorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[1] = new Answer({
      id: newAnswers[1]?.id || null,
      description: e.target.value,
      isCorrect: false,
    });

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });
  }

  const onSecondIncorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[2] = new Answer({
      id: newAnswers[2]?.id || null,
      description: e.target.value,
      isCorrect: false,
    });

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });
  }

  const onThirdIncorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[3] = new Answer({
      id: newAnswers[3]?.id || null,
      description: e.target.value,
      isCorrect: false,
    });

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });
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
            value={inputValues.statementInput}
            onChange={onStatementChange}
          />
        </FormControl>
    {
      question?.permalink
      && (
        <img className="question-statement-image" src={question.permalink || ''} />
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
            value={inputValues.answersInput[0]?.description || null}
            onChange={onCorrectAnswerChange}
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
            value={inputValues.answersInput[1]?.description || null}
            onChange={onFirstIncorrectAnswerChange}
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
            value={inputValues.answersInput[2]?.description || null}
            onChange={onSecondIncorrectAnswerChange}
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
            value={inputValues.answersInput[3]?.description || null}
            onChange={onThirdIncorrectAnswerChange}
          />
        </FormControl>
  </div>
  </div>
</div>
  );
}

export default QuestionScreen;
