import React from "react";
import { Tab, Tabs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faQuestion } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";
import QUESTION_DETAIL_STRINGS from "../../../resources/strings/question-detail";

const QuestionDetailTabs = ({ activeTab, onTabClick }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={onTabClick}
      className="question-detail-tabs"
    >
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faQuestion} />} iconPosition="start" label={ QUESTION_DETAIL_STRINGS.STATEMENT_TAB } />
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faComments} />} iconPosition="start" label={ QUESTION_DETAIL_STRINGS.FEEDBACKS_TAB } />
    </Tabs>
  );
}

export default QuestionDetailTabs;