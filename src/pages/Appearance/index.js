import React, { useState } from "react";
import AppearanceTabs from "./AppearanceTabs";
import Brand from "./Brand";
import Palette from "./Palette"
import AppearancePreview from "./AppearancePreview";

import './styles.css';

import Card from '@mui/material/Card';

const Appearance = () => {
  const [activeTab, setActiveTab] = useState(0);

  const onTabClick = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <AppearanceTabs
      activeTab={activeTab}
      onTabClick={onTabClick}
      />
      <div className="appearance-content">
      <Card className="appearance-card">
      { activeTab === 0 && 
      <Brand />}
            { activeTab === 1 && 
      <Palette/>}
      </Card>
      <AppearancePreview />
      </div>
    </>
  );
}

export default Appearance;
