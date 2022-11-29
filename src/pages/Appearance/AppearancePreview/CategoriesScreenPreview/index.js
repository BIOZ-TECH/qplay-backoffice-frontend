import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';

import './styles.css';
import CategoryRow from './CategoryRow';

const CategoriesScreenPreview = (props) => {
  const [previewCategories, setPreviewCategories] = useState(null);
  const { appName, headerAndButtons = {}, backgrounds = {}, categories } = props;
  const { primaryColor: headerAndButtonsBackgroundColor, secondaryColor: headerAndButtonsFontColor } = headerAndButtons;
  const { primaryColor: backgroundColor } = backgrounds;

  useEffect(() => {
    const newCategories = [];

    categories?.forEach((category, index) => {
      newCategories.push({
        name: category.name,
        state: index < 2 ? 'unblock' : (index === 2 ? 'progress' : 'block'),
        permalink: category.permalink,
        questions: category.questions.length,
      });
    });

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
            <CategoryRow key={`category-${index}`} {...props} category={category} index={index} />
          ))}

          </div>
          </div>
        </div>
  );
}

export default CategoriesScreenPreview;