import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ColorPicker from '../../../../../components/ColorPicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";

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
      <Typography>Letras complementarias</Typography>
      <div className="color-square" style={{ backgroundColor: primaryFontColor }}></div>
      <div className="color-square" style={{ backgroundColor: secondaryFontColor }}></div>
    </AccordionSummary>
    <AccordionDetails className="accordion-body">
      <div className="letters-input">
        <p>Letras principales</p>
      <ColorPicker
      color={primaryFontColor}
      setColor={setPrimaryFontColor}
      />
      </div>
      <div className="letters-input">
        <p>Letras sobre fondo</p>
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