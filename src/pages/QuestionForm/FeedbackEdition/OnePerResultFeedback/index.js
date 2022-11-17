import React from "react";

import "./styles.css";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import InflatedFeedbackEdition from "../InflatedFeedbackEdition";

const OnePerResultFeedback = ({ correctInflatedFeedback, setCorrectInflatedFeedback, inflatedIncorrectFeedback, setInflatedIncorrectFeedback, errorMessages, setErrorMessages }) => {
  return (
    <div className="one-per-result-feedback-container">
      <div className="feedbacks-container">
      <div className="feedback-container correct">
<InflatedFeedbackEdition
errorMessages={errorMessages} setErrorMessages={setErrorMessages}
feedbackResultType='correct'
inflatedFeedback={correctInflatedFeedback} setInflatedFeedback={setCorrectInflatedFeedback}/>
      </div>

<div className="feedback-container incorrect">
<InflatedFeedbackEdition
errorMessages={errorMessages} setErrorMessages={setErrorMessages} inflatedMessageType="inflatedIncorrectFeedback"
feedbackResultType='incorrect'
inflatedFeedback={inflatedIncorrectFeedback} setInflatedFeedback={setInflatedIncorrectFeedback} />

</div>
      </div>

    </div>
  );
}

export default OnePerResultFeedback;