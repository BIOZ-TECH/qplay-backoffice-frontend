import React, { useEffect, useState } from "react";

import appearanceService from '../../services/appearence';
import AppearanceTabs from "./AppearanceTabs";
import Brand from "./Brand";
import Palette from "./Palette"
import AppearancePreview from "./AppearancePreview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

import './styles.css';

import Card from '@mui/material/Card';
import Appearance from '../../entities/Appearance';

const AppearancePage = ({ setBreadcrumb, setAction }) => {
  const [appearance, setAppearance] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setBreadcrumb([
      {
        name: 'Apariencia',
        route: '/appearance',
      },
    ]);
    setAction({
      name: 'Guardar cambios',
      icon: faFloppyDisk,
      onActionClick: onSaveAppearanceChangesClick,
    });
    async function fetchAppearance() {
      const response = await appearanceService.getApplicationAppearance(0);

      console.log("entre");
      console.log(response.data);

      setAppearance(new Appearance(response.data));
    };

    fetchAppearance();
  }, []);

  const onTabClick = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onSaveAppearanceChangesClick = (e) => {
    appearanceService.updateApplicationAppearance(appearance, 0)
    .then( res => {
      console.log("resultado es ", res.status);
      console.log(res.data);
    });
  };

  return (
    <>
      <AppearanceTabs
      activeTab={activeTab}
      onTabClick={onTabClick}
      />
      { appearance &&
      <div className="appearance-content">
      <Card className="appearance-card">
      { activeTab === 0 && 
      <Brand
      appearance={appearance}
      setAppearance={setAppearance}
      />}
      { activeTab === 1 && 
      <Palette
      appearance={appearance}
      setAppearance={setAppearance}
      />}
      </Card>
      <AppearancePreview
      {...appearance}
      />
      </div>}
    </>
  );
}

export default AppearancePage;
