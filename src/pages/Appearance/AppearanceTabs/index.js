import React from "react";
import { Tab, Tabs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faMobileScreen, faPalette } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";
import APPEARANCE_STRINGS from "../../../resources/strings/appearance";

const AppearanceTabs = ({ activeTab, onTabClick }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={onTabClick}
      aria-label="icon position tabs example"
      className="appearance-tabs"
    >
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faMobileScreen} />} iconPosition="start" label={ APPEARANCE_STRINGS.BRAND_TAB } />
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faPalette} />} iconPosition="start" label={ APPEARANCE_STRINGS.PALETTE_TAB } />
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faGamepad} />} iconPosition="start" label={ APPEARANCE_STRINGS.GAMEPLAY_TAB } />
    </Tabs>
  );
}

export default AppearanceTabs;
