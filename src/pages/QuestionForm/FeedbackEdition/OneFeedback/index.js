import React from "react";
import InflatedFeedbackEdition from "../InflatedFeedbackEdition";

import "./styles.css";

const OneFeedback = ({ inflatedFeedback, setInflatedFeedback, errorMessages, setErrorMessages }) => {
  return (
    <div className="only-one-feedback">

    <InflatedFeedbackEdition
    errorMessages={errorMessages} setErrorMessages={setErrorMessages}
    inflatedFeedback={inflatedFeedback} setInflatedFeedback={setInflatedFeedback} />
    </div>
  );
}

export default OneFeedback;