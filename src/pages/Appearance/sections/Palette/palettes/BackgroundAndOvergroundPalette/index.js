import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";
import ColorPicker from '../../../../../../components/ColorPicker';
import APPEARANCE_STRINGS from "../../../../../../resources/strings/appearance";

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
      <Typography>{ APPEARANCE_STRINGS.PALETTE_SECTION.BACKGROUND_AND_OVERGROUND_PALETTE.TITLE }</Typography>
      <div className="color-square" style={{ backgroundColor: backgroundColor }}></div>
      <div className="color-square" style={{ backgroundColor: overgroundColor }}></div>
    </AccordionSummary>
    <AccordionDetails className="accordion-body">
      <div className="background-input">
        <p>{ APPEARANCE_STRINGS.PALETTE_SECTION.BACKGROUND_AND_OVERGROUND_PALETTE.MAIN_BACKGROUND }</p>
      <ColorPicker
      color={backgroundColor}
      setColor={setBackgroundColor}
      />
      </div>
      <div className="letters-input">
        <p>{ APPEARANCE_STRINGS.PALETTE_SECTION.BACKGROUND_AND_OVERGROUND_PALETTE.OVERGROUND }</p>
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