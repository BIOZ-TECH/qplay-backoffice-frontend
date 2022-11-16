import React from "react";
import Card from '@mui/material/Card';

import './styles.css';
import CategoryRow from './CategoryRow';

const CategoriesScreenPreview = (props) => {
  const { appName, headerAndButtons, backgrounds, letters, selectableAnswers, logo } = props;
  const { primaryColor: headerAndButtonsBackgroundColor, secondaryColor: headerAndButtonsFontColor } = headerAndButtons;
  const { primaryColor: primaryLettersColor, secondaryColor: overgroundLettersColor } = letters;
  const { primaryColor: backgroundColor, secondaryColor: overgroundColor } = backgrounds;
  const { primaryColor: selectableAnswersBackgroundColor, secondaryColor: selectableAnswersFontColor } = selectableAnswers;

  const categories = [
    {
      name: 'Categoría 1',
      state: 'unblock',
      answers: 5
    },
    {
      name: 'Categoría 2',
      state: 'progress',
      answers: 4
    },
    {
      name: 'Categoría 3',
      state: 'block',
      answers: 6
    },
    {
      name: 'Categoría 4',
      state: 'block',
      answers: 5
    },
  ];



  return (
        <div className="mobile-device" style={{ backgroundColor }}>
          <div className="mobile-header" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor }}>
          <p className="mobile-app-name">{appName}</p>
          </div>
          <div className="app-body">
          { categories.map((category, index) => (
            <CategoryRow  {...props} category={category} index={index} />
          ))}
          </div>
        </div>
  );
}

export default CategoriesScreenPreview;