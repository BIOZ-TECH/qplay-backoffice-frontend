import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ColorPicker from '../../../../../components/ColorPicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";

const ButtonPalette = ({ appearance, setAppearance }) => {
  const { primaryColor: backgroundColor, secondaryColor: fontColor } = appearance.button;

  const setBackgroundColor = (color) => {
    setAppearance({
      ...appearance,
      button: { ...appearance.button, primaryColor: color }
    });
  };

  const setFontColor = (color) => {
    setAppearance({
      ...appearance,
      button: { ...appearance.button, secondaryColor: color }
    });
  }

  return (
    <Accordion className="accordion-container mt-5">
    <AccordionSummary
      expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      aria-controls="header-palette"
      id="header-palette"
    >
      <Typography>Botones</Typography>
      <div className="color-square" style={{ backgroundColor }}></div>
      <div className="color-square" style={{ backgroundColor: fontColor }}></div>
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
        <p>Letras</p>
      <ColorPicker
      color={fontColor}
      setColor={setFontColor}
      />
      </div>
    </AccordionDetails>
  </Accordion>
  );
}

export default ButtonPalette;