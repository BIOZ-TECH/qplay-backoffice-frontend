import React from "react";

import "./styles.css";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import InflatedFeedbackEdition from "../InflatedFeedbackEdition";

const OnePerResultFeedback = ({ correctInflatedFeedback, setCorrectInflatedFeedback, inflatedIncorrectFeedback, setInflatedIncorrectFeedback, errorMessages, setErrorMessages }) => {
  return (
    <div className="one-per-result-feedback-container">
      <div className="feedback-container correct">
      <Accordion className="accordion-container mt-5">
<AccordionSummary
  className="accordion-header"
  expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
  aria-controls="correct-feedback-accordion"
  id="correct-feedback-accordion"
>
  <Typography>Feedback para respuesta correcta</Typography>
</AccordionSummary>
<AccordionDetails className="accordion-body">
<InflatedFeedbackEdition
errorMessages={errorMessages} setErrorMessages={setErrorMessages}
feedbackResultType='correct'
inflatedFeedback={correctInflatedFeedback} setInflatedFeedback={setCorrectInflatedFeedback}/>
</AccordionDetails>
</Accordion>
      </div>

<div className="feedback-container incorrect">
<Accordion className="accordion-container mt-5">
<AccordionSummary
  className="accordion-header"
  expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
  aria-controls="incorrect-feedback-accordion"
  id="incorrect-feedback-accordion"
>
  <Typography>Feedback para respuestas incorrectas</Typography>
</AccordionSummary>
<AccordionDetails className="accordion-body">
<InflatedFeedbackEdition
errorMessages={errorMessages} setErrorMessages={setErrorMessages} inflatedMessageType="inflatedIncorrectFeedback"
feedbackResultType='incorrect'
inflatedFeedback={inflatedIncorrectFeedback} setInflatedFeedback={setInflatedIncorrectFeedback} />
</AccordionDetails>
</Accordion>
</div>

    </div>
  );
}

export default OnePerResultFeedback;