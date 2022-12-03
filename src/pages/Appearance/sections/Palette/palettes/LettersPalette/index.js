import React from "react";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";
import ColorPicker from '../../../../../../components/ColorPicker';
import APPEARANCE_STRINGS from "../../../../../../resources/strings/appearance";

const LettersPalette  = ({ appearance, setAppearance }) => {
  const { primaryColor: primaryFontColor, secondaryColor: secondaryFontColor } = appearance.letters;

  const setPrimaryFontColor = (color) => {
    setAppearance({
      ...appearance, letters: {
        ...appearance.letters,
        primaryColor: color,
      },
    });
  };

  const setSecondaryFontColor = (color) => {
    setAppearance({
      ...appearance, letters: {
        ...appearance.letters,
        secondaryColor: color,
      },
    });
  };

  return (
    <Accordion className="accordion-container mt-5">
    <AccordionSummary
      expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      aria-controls="header-palette"
      id="header-palette"
    >
      <Typography>{ APPEARANCE_STRINGS.PALETTE_SECTION.LETTERS_PALETTE.TITLE }</Typography>
      <div className="color-square" style={{ backgroundColor: primaryFontColor }}></div>
      <div className="color-square" style={{ backgroundColor: secondaryFontColor }}></div>
    </AccordionSummary>
    <AccordionDetails className="accordion-body">
      <div className="letters-input">
        <p>{ APPEARANCE_STRINGS.PALETTE_SECTION.LETTERS_PALETTE.MAIN_LETTERS }</p>
      <ColorPicker
      color={primaryFontColor}
      setColor={setPrimaryFontColor}
      />
      </div>
      <div className="letters-input">
        <p>{ APPEARANCE_STRINGS.PALETTE_SECTION.LETTERS_PALETTE.OVERGROUND_LETTERS }</p>
      <ColorPicker
      color={secondaryFontColor}
      setColor={setSecondaryFontColor}
      />
      </div>
    </AccordionDetails>
  </Accordion>
  );
}

export default LettersPalette;