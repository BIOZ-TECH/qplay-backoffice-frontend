import React, { useCallback, useEffect, useState } from "react";

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
import AppearanceValidator from "../../validators/entity/AppearanceValidator";

const AppearancePage = ({ setBreadcrumb, setAction, setMessage }) => {
  const [appearance, setAppearance] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errorMessages, setErrorMessages] = useState({});
  /*const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);*/

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
      const response = await appearanceService.getApplicationAppearance(0, 3);

      setAppearance(new Appearance(response.data));
    };

    fetchAppearance();
  }, []);

  useEffect(() => {
    updateAction();
  }, [appearance]);

  const onTabClick = (event, newValue) => {
    setActiveTab(newValue);
  };

  const updateAction = () => {
    setAction({
      name: 'Guardar cambios',
      icon: faFloppyDisk,
      onActionClick: onSaveAppearanceChangesClick,
    });
  }

  const onSaveAppearanceChangesClick = async() => {
    const appearanceValidator = new AppearanceValidator(appearance);

    const newMessages = appearanceValidator.validate();
    setErrorMessages(newMessages);
  
    if (Object.keys(newMessages).length === 0) {
    await appearanceService.updateApplicationAppearance(appearance, 0, 3)
    .then((res) => {
      if (res.status = 200) {
        setMessage({
          severity: 'success',
          text: 'La apariencia ha sido actualizada correctamente'
        });
        window.location.reload();
      }
    });
    }
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
      errorMessages={errorMessages}
      setErrorMessages={setErrorMessages}
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
