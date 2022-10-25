import React, { createRef, useEffect, useRef, useState } from "react";

import "./styles.css";
import { Card, FormControl, FormHelperText, InputAdornment, OutlinedInput, TextField, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import Answer from "../../../entities/Answer";

const QuestionScreen = ({ question, inputValues, setInputValues, errorMessages, setErrorMessages }) => {

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

    setErrorMessages({
      ...errorMessages,
      statement: null,
    });
  }

  const onCorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[0] = e.target.value ? new Answer({
      id: newAnswers[0]?.id || null,
      description: e.target.value,
      isCorrect: true,
    }) : null;

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });

    setErrorMessages({
      ...errorMessages,
      answers: null,
      firstAnswer: null,
    });
  }

  const onFirstIncorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[1] = e.target.value ? new Answer({
      id: newAnswers[1]?.id || null,
      description: e.target.value,
      isCorrect: false,
    }) : null;

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });

    setErrorMessages({
      ...errorMessages,
      answers: null,
      secondAnswer: null,
    });
  }

  const onSecondIncorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[2] = e.target.value ? new Answer({
      id: newAnswers[2]?.id || null,
      description: e.target.value,
      isCorrect: false,
    }) : null;

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });
    
    setErrorMessages({
      ...errorMessages,
      answers: null,
      thirdAnswer: null,
    });
  }

  const onThirdIncorrectAnswerChange = (e) => {
    const newAnswers = [...inputValues.answersInput];
    newAnswers[3] = e.target.value? new Answer({
      id: newAnswers[3]?.id || null,
      description: e.target.value,
      isCorrect: false,
    }) : null;

    setInputValues({
      ...inputValues,
      answersInput: newAnswers,
    });

    setErrorMessages({
      ...errorMessages,
      answers: null,
      fourthAnswer: null,
    });
  }

  return (
    <>
    <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                open={!!errorMessages.answers}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={errorMessages.answers}
                arrow
                placement="right-end"
              >
<div className="mobile-device">

  <div className="app-body">
  <div className="mobile-question-card">
  <FormControl fullWidth error={!!errorMessages.statement}>
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
          <FormHelperText className={errorMessages.statement ? "question-statement-error" : ""}>{errorMessages.statement}</FormHelperText>
        </FormControl>
    {
      question?.permalink
      && (
        <img className="question-statement-image" src={question.permalink || ''} />
      )
    }
  </div>
  <div className="mobile-answers">
  <FormControl fullWidth error={!!errorMessages.firstAnswer?.description}>
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
          <FormHelperText className={errorMessages.firstAnswer?.description ? "question-answer-error" : ""}>{errorMessages.firstAnswer?.description}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errorMessages.secondAnswer?.description}>
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
          <FormHelperText className={errorMessages.secondAnswer?.description ? "question-answer-error" : ""}>{errorMessages.secondAnswer?.description}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errorMessages.thirdAnswer?.description}>
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
          <FormHelperText className={errorMessages.thirdAnswer?.description ? "question-answer-error" : ""}>{errorMessages.thirdAnswer?.description}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errorMessages.fourthAnswer?.description}>
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
          <FormHelperText className={errorMessages.fourthAnswer?.description ? "question-answer-error" : ""}>{errorMessages.fourthAnswer?.description}</FormHelperText>
        </FormControl>
  </div>
  </div>


</div>
</Tooltip>
</>
  );
}

export default QuestionScreen;
