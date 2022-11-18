import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';

import './styles.css';
import CategoryRow from './CategoryRow';

const CategoriesScreenPreview = (props) => {
  const [previewCategories, setPreviewCategories] = useState(null);
  const { appName, headerAndButtons, backgrounds, letters, selectableAnswers, logo, categories } = props;
  const { primaryColor: headerAndButtonsBackgroundColor, secondaryColor: headerAndButtonsFontColor } = headerAndButtons;
  const { primaryColor: primaryLettersColor, secondaryColor: overgroundLettersColor } = letters;
  const { primaryColor: backgroundColor, secondaryColor: overgroundColor } = backgrounds;
  const { primaryColor: selectableAnswersBackgroundColor, secondaryColor: selectableAnswersFontColor } = selectableAnswers;

  useEffect(() => {
    const newCategories = [];

    for(let i = 0; i <= 7; i++) {
      const category = categories[i];
      newCategories.push({
        name: category.name,
        state: i < 2 ? 'unblock' : (i === 2 ? 'progress' : 'block'),
        permalink: category.permalink,
        questions: category.questions.length,
      });
    }

    setPreviewCategories(newCategories);
  }, []);

  return (
        <div className="mobile-device">
          <div className="mobile-header" style={{ backgroundColor: headerAndButtonsBackgroundColor, color: headerAndButtonsFontColor }}>
          <p className="mobile-app-name">{appName}</p>
          </div>
          <div className="mobile-body" style={{ backgroundColor }}>
          <div className="app-body">
            { previewCategories && previewCategories.map((category, index) => (
            <CategoryRow  {...props} category={category} index={index} />
          ))}

          </div>
          </div>
        </div>
  );
}

export default CategoriesScreenPreview;