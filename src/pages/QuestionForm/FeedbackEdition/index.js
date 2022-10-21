import React, { useEffect, useState } from "react";

import "./styles.css";
import Feedback from "../../../entities/Feedback";
import { Accordion, AccordionDetails, AccordionSummary, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import OneFeedback from "./OneFeedback";
import OnePerResultFeedback from "./OnePerResultFeedback";
import FeedbackPreview from "./FeedbackPreview";
import InflatedFeedback from "../../../entities/InflatedFeedback";

const QuestionDetail = ({ feedbackDetail }) => {
  const [feedback, setFeedback] = useState(new Feedback({}));

useEffect(() => {
    if(feedbackDetail) setFeedback(new Feedback(feedbackDetail));
  }, [feedbackDetail]);

  const handleFeedbackTypeChange = (e) => {
    setFeedback(new Feedback({ ...feedback, inflatedFeedback: null, inflatedIncorrectFeedback: null, type: e.target.value }));
  }

  const setInflatedFeedback = (inflatedFeedback) => {
    setFeedback(new Feedback({ ...feedback, inflatedFeedback: new InflatedFeedback(inflatedFeedback) }));
  }

  const setInflatedIncorrectFeedback = (inflatedIncorrectFeedback) => {
    setFeedback(new Feedback({ ...feedback, inflatedIncorrectFeedback: new InflatedFeedback(inflatedIncorrectFeedback) }));
  }

  return (
<Accordion className="accordion-container mt-5">
<AccordionSummary
  expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
  id="feedback-accordion-header"
>
  <Typography>Feedback</Typography>
</AccordionSummary>
<AccordionDetails className="feedback-accordion-body">
    <Card className="feedback-data-container">
    <FormControl fullWidth>
        <InputLabel id="feedback-type-label">¿Cuántos feedback tiene la pregunta?</InputLabel>
        <Select
    labelId="feedback-type-label"
    id="feedback-type-select"
    value={feedback.type}
    label="Enunciado con"
    onChange={handleFeedbackTypeChange}
        >
    <MenuItem value="none">Ninguno</MenuItem>
    <MenuItem value="only-one">Uno solo para todas las respuestas</MenuItem>
    <MenuItem value="one-per-result">Uno para la respuesta correcta y otro para las respuestas incorrectas</MenuItem>
        </Select>
      </FormControl>
    {
        feedback.type === 'only-one'
        && (
            <OneFeedback inflatedFeedback={feedback.inflatedFeedback} setInflatedFeedback={setInflatedFeedback} />
        )
    }
        {
        feedback.type === 'one-per-result'
        && (
            <OnePerResultFeedback 
            correctInflatedFeedback={feedback.inflatedFeedback} setCorrectInflatedFeedback={setInflatedFeedback}
            inflatedIncorrectFeedback={feedback.inflatedIncorrectFeedback} setInflatedIncorrectFeedback={setInflatedIncorrectFeedback}/>
        )
    }
    </Card>
    <Card className="feedback-preview-container">
    {
        feedback?.type !== 'none'
        && (
          <>
            <FeedbackPreview inflatedFeedback={feedback.inflatedFeedback} feedbackResultType={feedback.type === 'one-per-result' ? 'correct': 'any'} setInflatedFeedback={setInflatedFeedback}/>
            {
              feedback.type === 'one-per-result' && feedback.inflatedIncorrectFeedback
              && (
                <FeedbackPreview inflatedFeedback={feedback.inflatedIncorrectFeedback} feedbackResultType="incorrect" setInflatedFeedback={setInflatedIncorrectFeedback}/>
              )
            }
          </>
        )
    }
    </Card>
</AccordionDetails>
</Accordion>
  );
}

export default QuestionDetail;
