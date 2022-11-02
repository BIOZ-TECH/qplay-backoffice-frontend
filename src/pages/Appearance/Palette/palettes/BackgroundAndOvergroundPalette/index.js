import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ColorPicker from '../../../../../components/ColorPicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";

const BackgroundAndOvergroundPalette = ({ appearance, setAppearance }) => {
  const { primaryColor: backgroundColor, secondaryColor: overgroundColor } = appearance.backgrounds;

  const setBackgroundColor = (color) => {
    setAppearance({
      ...appearance,
      backgrounds: { ...appearance.backgrounds, primaryColor: color },
    });
  };

  const setOvergroundColor = (color) => {
    setAppearance({
      ...appearance,
      backgrounds: { ...appearance.backgrounds, secondaryColor: color },
    });
  };

  return (
    <Accordion className="accordion-container mt-5">
    <AccordionSummary
      expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      aria-controls="header-palette"
      id="header-palette"
    >
      <Typography>Fondo de la aplicación</Typography>
      <div className="color-square" style={{ backgroundColor: backgroundColor }}></div>
      <div className="color-square" style={{ backgroundColor: overgroundColor }}></div>
    </AccordionSummary>
    <AccordionDetails className="accordion-body">
      <div className="background-input">
        <p>Fondo</p>
      <ColorPicker
      color={backgroundColor}
      setColor={setBackgroundColor}
      />
      </div>
      <div className="letters-input">
        <p>Sobrefondo</p>
      <ColorPicker
      color={overgroundColor}
      setColor={setOvergroundColor}
      />
      </div>
    </AccordionDetails>
  </Accordion>
  );
}

export default BackgroundAndOvergroundPalette;