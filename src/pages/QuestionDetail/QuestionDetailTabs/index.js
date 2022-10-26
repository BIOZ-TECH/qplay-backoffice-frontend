import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileScreen, faComments, faQuestionCircle, faQuestion } from '@fortawesome/free-solid-svg-icons'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "./styles.css";

const QuestionDetailTabs = ({ activeTab, onTabClick }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={onTabClick}
      className="question-detail-tabs"
    >
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faQuestion} />} iconPosition="start" label="enunciado" />
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faComments} />} iconPosition="start" label="feedbacks" />
    </Tabs>
  );
}

export default QuestionDetailTabs;