import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";
import ColorPicker from '../../../../../../components/ColorPicker';
import APPEARANCE_STRINGS from "../../../../../../resources/strings/appearance";

const HeaderAndButtonsPalette = ({ appearance, setAppearance }) => {
  const { primaryColor: backgroundColor, secondaryColor: fontColor } = appearance.headerAndButtons;

  const setBackgroundColor = (color) => {
    setAppearance({
      ...appearance,
      headerAndButtons: { ...appearance.headerAndButtons, primaryColor: color },
    });
  };

  const setFontColor = (color) => {
    setAppearance({
      ...appearance,
      headerAndButtons: { ...appearance.headerAndButtons, secondaryColor: color },
    });
  }

  return (
    <Accordion className="accordion-container mt-5">
    <AccordionSummary
      expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
      aria-controls="header-palette"
      id="header-palette"
    >
      <Typography>{ APPEARANCE_STRINGS.PALETTE_SECTION.HEADER_AND_BUTTONS_PALETTE.TITLE }</Typography>
      <div className="color-square" style={{ backgroundColor }}></div>
      <div className="color-square" style={{ backgroundColor: fontColor }}></div>
    </AccordionSummary>
    <AccordionDetails className="accordion-body">
      <div className="background-input">
        <p>{ APPEARANCE_STRINGS.PALETTE_SECTION.HEADER_AND_BUTTONS_PALETTE.BACKGROUND }</p>
      <ColorPicker
      color={backgroundColor}
      setColor={setBackgroundColor}
      />
      </div>
      <div className="letters-input">
        <p>{ APPEARANCE_STRINGS.PALETTE_SECTION.HEADER_AND_BUTTONS_PALETTE.LETTERS }</p>
      <ColorPicker
      color={fontColor}
      setColor={setFontColor}
      />
      </div>
    </AccordionDetails>
  </Accordion>
  );
}

export default HeaderAndButtonsPalette;