import React, { useEffect, useState } from "react";

import "./styles.css";
import Feedback from "../../../entities/Feedback";
import { Accordion, AccordionDetails, AccordionSummary, Card, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import OneFeedback from "./OneFeedback";
import OnePerResultFeedback from "./OnePerResultFeedback";
import FeedbackPreview from "./FeedbackPreview";
import InflatedFeedback from "../../../entities/InflatedFeedback";

const FeedbackEdition = ({ inputValues, setInputValues, errorMessages, setErrorMessages }) => {
  //const [feedback, setFeedback] = useState(new Feedback({}));

/*useEffect(() => {
    if(feedbackDetail) setFeedback(new Feedback(feedbackDetail));
  }, [feedbackDetail]);*/

  const handleFeedbackTypeChange = (e) => {
    const newFeedbackType = e.target.value;

    if (newFeedbackType) {
        setInputValues({
          ...inputValues,
          feedbackInput: new Feedback({ ...inputValues.feedbackInput,
            inflatedFeedback: new InflatedFeedback({ statement: ''}),
            inflatedIncorrectFeedback: new InflatedFeedback({ statement: ''}),
            type: e.target.value }),
        });
        setErrorMessages({
          ...errorMessages,
          inflatedFeedback: null,
          inflatedIncorrectFeedback: null,
          feedbackType: null,
        });
    }
  }

  const setInflatedFeedback = (inflatedFeedback) => {
    setInputValues({
      ...inputValues,
      feedbackInput: new Feedback({ ...inputValues.feedbackInput, inflatedFeedback: new InflatedFeedback(inflatedFeedback) }),
    });
  }

  const setInflatedIncorrectFeedback = (inflatedIncorrectFeedback) => {
    setInputValues({
      ...inputValues,
      feedbackInput: new Feedback({ ...inputValues.feedbackInput, inflatedIncorrectFeedback: new InflatedFeedback(inflatedIncorrectFeedback) }),
    });
  }

  return (
    <>
    <Card className="feedback-data-container">
    <FormControl fullWidth
    error={!!errorMessages.feedbackType}
    >
        <InputLabel id="feedback-type-label">¿Cuántos feedback tiene la pregunta?</InputLabel>
        <Select
    labelId="feedback-type-label"
    id="feedback-type-select"
    value={inputValues.feedbackInput.type || ''}
    label="Enunciado con"
    onChange={handleFeedbackTypeChange}
        >
    <MenuItem value="no-feedback">Ninguno</MenuItem>
    <MenuItem value="unique-feedback">Uno solo para todas las respuestas</MenuItem>
    <MenuItem value="variable-feedback">Uno para la respuesta correcta y otro para las respuestas incorrectas</MenuItem>
        </Select>
        <FormHelperText>{errorMessages.feedbackType}</FormHelperText>
      </FormControl>

    {
        inputValues.feedbackInput?.type === 'unique-feedback'
        && (
            <OneFeedback
            errorMessages={errorMessages} setErrorMessages={setErrorMessages}
            inflatedFeedback={inputValues.feedbackInput.inflatedFeedback} setInflatedFeedback={setInflatedFeedback} />
        )
    }
        {
        inputValues.feedbackInput?.type === 'variable-feedback'
        && (
            <OnePerResultFeedback 
            errorMessages={errorMessages} setErrorMessages={setErrorMessages}
            correctInflatedFeedback={inputValues.feedbackInput.inflatedFeedback} setCorrectInflatedFeedback={setInflatedFeedback}
            inflatedIncorrectFeedback={inputValues.feedbackInput.inflatedIncorrectFeedback} setInflatedIncorrectFeedback={setInflatedIncorrectFeedback}/>
        )
    }
    </Card>
    {/*<Card className="feedback-preview-container">

    
        inputValues.feedbackInput.type !== 'no-feedback'
        && (
          <>
            <FeedbackPreview
            errorMessages={errorMessages} setErrorMessages={setErrorMessages}
            inflatedFeedback={inputValues.feedbackInput.inflatedFeedback} feedbackResultType={inputValues.feedbackInput.type === 'variable-feedback' ? 'correct': 'any'} setInflatedFeedback={setInflatedFeedback}/>
            {
              inputValues.feedbackInput.type === 'variable-feedback'
              && (
                <FeedbackPreview
                errorMessages={errorMessages} setErrorMessages={setErrorMessages}
                inflatedFeedback={inputValues.feedbackInput.inflatedIncorrectFeedback} feedbackResultType="incorrect" setInflatedFeedback={setInflatedIncorrectFeedback}/>
              )
            }
          </>
        )
          
    </Card>*/}
    </>
  );
}

export default FeedbackEdition;
