import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import './styles.css';
import Line from "../../../../../components/Line";

const CategoriesScreenPreview = (props) => {
  const { headerAndButtons, letters, index, category, gameplaySettings } = props;
  const { progressOn } = gameplaySettings;
  const { primaryColor: headerAndButtonsBackgroundColor } = headerAndButtons;
  const { secondaryColor: overgroundLettersColor } = letters;
  const [rowPosition, setRowPosition] = useState(index % 2);

  return (
          <>
          { index !== 0 && <Line borderColor={ overgroundLettersColor} rowPosition={rowPosition} />}
          <div className="category-row" style={{ flexDirection: rowPosition === 0 ? 'row' : 'row-reverse' }} >
            <div className="category-image-container" style={{ backgroundColor: category.state === 'block' && progressOn ? 'gray' : headerAndButtonsBackgroundColor }}>
              <div className="image" style={{ backgroundImage: `url(${category.permalink})`, filter: category.state === 'block' && progressOn ? 'grayscale(100%)' : 'none' }}>
              </div>
              { category.state === 'block' && progressOn && (
                              <div className="lock">
                              <div>
                              <FontAwesomeIcon className="shadow" icon={faLock} />
                              <FontAwesomeIcon icon={faLock} />
                              </div>
                            </div>
              )}
            </div>
            <div className="category-detail" style={{ paddingRight: rowPosition === 0 ? '0' : '0.8rem' }}>
              <p className="title" style={{ color: overgroundLettersColor }}>{category.name}</p>
              <p style={{ color: overgroundLettersColor }}>{`${category.state === 'block' && progressOn ? 0 : (category.questions / ( category.state === 'progress' ? 2 : 1))}/${category.questions}`}</p>
            </div>
          </div>
          </>
  );
}

export default CategoriesScreenPreview;