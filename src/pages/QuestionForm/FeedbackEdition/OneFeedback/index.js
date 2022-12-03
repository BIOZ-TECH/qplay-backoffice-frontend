import React from "react";

import "./styles.css";
import InflatedFeedbackEdition from "../InflatedFeedbackEdition";

const OneFeedback = ({ inflatedFeedback, setInflatedFeedback, errorMessages, setErrorMessages }) => {
  return (
    <div className="only-one-feedback">

    <InflatedFeedbackEdition
    errorMessages={errorMessages} setErrorMessages={setErrorMessages}
    inflatedFeedback={inflatedFeedback} setInflatedFeedback={setInflatedFeedback}
    feedbackResultType='any'
    />
    </div>
  );
}

export default OneFeedback;