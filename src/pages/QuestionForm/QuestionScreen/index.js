import React, { createRef, useRef, useState } from "react";

import "./styles.css";
import { Button, ClickAwayListener, FormControl, FormHelperText, Grow, InputAdornment, MenuItem, MenuList, OutlinedInput, Paper, Popper, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPencil } from "@fortawesome/free-solid-svg-icons";
import Answer from "../../../entities/Answer";
import AccessibleImageDialog from "../../../components/multimedia-dialogs/AccessibleImageDialog";

const QuestionScreen = (props) => {
  const { question, inputValues, setInputValues, errorMessages, setErrorMessages } = props;
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
    if (inputValues.statementImageInput) {
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
  const setImageData = (image, accessibility) => {
    setInputValues({...inputValues, statementImageInput: image, imageAccessibilityInput: accessibility});
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
        <div className="image-statement-form-container">
<div style={{ position: inputValues?.statementImageInput ? 'absolute' : 'relative', width: '100%' }}>

<Button
className={`multimedia-btn ${inputValues?.statementImageInput ? 'uploaded' : ''}`}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={(e) => {
            handleToggle(e); 
          }}
        >
          <FontAwesomeIcon className={!inputValues.statementImageInput ? "mr-2" : ""} icon={inputValues.statementImageInput ? faPencil : faImage} />
          {!inputValues.statementImageInput && <p>Agregar imagen</p>}
        </Button>

        {inputValues?.statementImageInput && <Popper
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
                      onClick={() => setImageData(null, null)}
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
      inputValues?.statementImageInput
      && (
        <div className="question-image-container">
                  <Tooltip
        title={inputValues?.imageAccessibilityInput}
        arrow
        placement="right"
      >
          <img className="question-statement-image" src={inputValues.statementImageInput || ''} />
          
        </Tooltip>
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
<AccessibleImageDialog
open={openImageDialog}
setOpen={setOpenImageDialog}
selectedFile={inputValues.statementImageInput}
imageAccessibility={inputValues.imageAccessibilityInput}
setImageData={setImageData}
dialogType="para pregunta"
/>
</>
  );
}

export default QuestionScreen;
