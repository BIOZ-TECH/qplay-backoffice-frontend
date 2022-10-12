import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ColorPicker from '../../../../../components/ColorPicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";

const InputTextPalette = ({ appearance, setAppearance }) => {
  const { primaryColor: fontColor, secondaryColor: hintColor, tertiaryColor: focusColor } = appearance.inputText;

  const setFocusColor = (color) => {
    setAppearance({
      ...appearance,
      inputText: { ...appearance.inputText, tertiaryColor: color }
    });
  };

  const setFontColor = (color) => {
    setAppearance({
      ...appearance,
      inputText: { ...appearance.inputText, primaryColor: color }
    });
  };

  const setHintColor = (color) => {
    setAppearance({
      ...appearance,
      inputText: { ...appearance.inputText, secondaryColor: color }
    });
  };

  return (
    <Accordion className="accordion-container mt-5">
    <AccordionSummary
      expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      aria-controls="header-palette"
      id="header-palette"
    >
      <Typography>Inputs de texto</Typography>
      <div className="color-square" style={{ backgroundColor: fontColor }}></div>
      <div className="color-square" style={{ backgroundColor: hintColor }}></div>
      <div className="color-square" style={{ backgroundColor: focusColor }}></div>
    </AccordionSummary>
    <AccordionDetails className="accordion-body">
      <div className="letters-input">
        <p>Letras</p>
      <ColorPicker
      color={fontColor}
      setColor={setFontColor}
      />
      </div>
      <div className="letters-input">
        <p>Hints</p>
      <ColorPicker
      color={hintColor}
      setColor={setHintColor}
      />
      </div>
      <div className="letters-input">
        <p>Input seleccionado</p>
      <ColorPicker
      color={focusColor}
      setColor={setFocusColor}
      />
      </div>
    </AccordionDetails>
  </Accordion>
  );
}

export default InputTextPalette;