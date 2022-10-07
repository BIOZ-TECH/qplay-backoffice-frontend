import React, { useState } from "react";
import AppearanceTabs from "./AppearanceTabs";
import Brand from "./Brand";
import Palette from "./Palette"
import AppearancePreview from "./AppearancePreview";

import './styles.css';

import Card from '@mui/material/Card';

const Appearance = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [appName, setAppName] = useState("Q-Play");

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
      <Brand
      appName={appName}
      setAppName={setAppName}
      />}
            { activeTab === 1 && 
      <Palette/>}
      </Card>
      <AppearancePreview
      appName={appName}
      />
      </div>
    </>
  );
}

export default Appearance;
