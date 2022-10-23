import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileScreen, faPalette } from '@fortawesome/free-solid-svg-icons'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "./styles.css";

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
    </Tabs>
  );
}

export default AppearanceTabs;
