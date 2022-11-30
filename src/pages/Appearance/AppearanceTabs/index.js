import React from "react";
import { Tab, Tabs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faMobileScreen, faPalette } from '@fortawesome/free-solid-svg-icons'

import "../styles.css";

const AppearanceTabs = ({ activeTab, onTabClick }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={onTabClick}
      aria-label="icon position tabs example"
      className="appearance-tabs"
    >
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faMobileScreen} />} iconPosition="start" label="marca" />
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faPalette} />} iconPosition="start" label="paleta de colores" />
      <Tab className="tab" icon={<FontAwesomeIcon className="icon" icon={faGamepad} />} iconPosition="start" label="jugabilidad" />
    </Tabs>
  );
}

export default AppearanceTabs;
