import React from "react";
import InflatedFeedbackEdition from "../InflatedFeedbackEdition";

import "./styles.css";

const OneFeedback = ({ inflatedFeedback, setInflatedFeedback }) => {
  return (
    <div className="only-one-feedback">
    <InflatedFeedbackEdition inflatedFeedback={inflatedFeedback} setInflatedFeedback={setInflatedFeedback} />
    </div>
  );
}

export default OneFeedback;