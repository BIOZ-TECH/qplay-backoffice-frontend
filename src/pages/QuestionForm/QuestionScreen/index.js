import React, { createRef, useEffect, useRef, useState } from "react";

import "./styles.css";
import { Button, Card, ClickAwayListener, FormControl, FormHelperText, Grow, InputAdornment, MenuItem, MenuList, OutlinedInput, Paper, Popper, TextField, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPencil, faPhotoFilm, faUpload } from "@fortawesome/free-solid-svg-icons";
import Answer from "../../../entities/Answer";
import ImageDialog from "../../../components/multimedia-dialogs/ImageDialog";

const QuestionScreen = ({ question, inputValues, setInputValues, errorMessages, setErrorMessages, setStatementImage, statementImage }) => {

  const [open, setOpen] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const anchorRef = useRef(null);
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

  const handleToggle = () => {
    if (statementImage) {
    setOpen((prevOpen) => !prevOpen);
  } else {
    setOpenImageDialog(true);
  }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

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
        <div className="image-statement-form-container">
<div style={{ position: question && question.permalink ? 'absolute' : 'relative', width: '100%' }}>

<Button
className={`multimedia-btn ${question && question.permalink ? 'uploaded' : ''}`}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onMouseOver={(e) => {
            if(!!statementImage) handleToggle(e); 
          }}
          onClick={(e) => {
            if(!statementImage) handleToggle(e); 
          }}
        >
          <FontAwesomeIcon className={!statementImage ? "mr-2" : ""} icon={statementImage ? faPencil : faImage} />
          {!statementImage && <p>Agregar imagen</p>}
        </Button>

        {question && question.permalink && <Popper
        sx={{
          zIndex: 1,
        }}
        style={{ top:'auto', left: 'auto', right: 0, position: 'absolute' }}
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                <MenuItem
                      key="image-link"
                      onClick={() => setOpenImageDialog(true)}
                    >
                      Cambiar imagen
                    </MenuItem>
                     <MenuItem
                      key="video-link"
                      onClick={() => setStatementImage(null)}
                    >
                      Eliminar imagen
                    </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>}
</div>
      {
      question?.permalink
      && (
        <div className="question-image-container">
          <img className="question-statement-image" src={question.permalink || ''} />
          </div>
        
      )
    }
</div>
    
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
<ImageDialog
open={openImageDialog}
setOpen={setOpenImageDialog}
selectedFile={statementImage}
setSelectedFile={setStatementImage}
dialogType="para pregunta"
/>
</>
  );
}

export default QuestionScreen;
