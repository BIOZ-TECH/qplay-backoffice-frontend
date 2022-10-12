import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ColorPicker from '../../../../../components/ColorPicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";

const BackgroundPalette = ({ appearance, setAppearance }) => {
  const { appBackground } = appearance;

  const setBackgroundColor = (color) => {
    setAppearance({
      ...appearance, appBackground: color,
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
      <div className="color-square" style={{ backgroundColor: appBackground }}></div>
    </AccordionSummary>
    <AccordionDetails className="accordion-body">
      <div className="background-input">
        <p>Fondo</p>
      <ColorPicker
      color={appBackground}
      setColor={setBackgroundColor}
      />
      </div>
    </AccordionDetails>
  </Accordion>
  );
}

export default BackgroundPalette;