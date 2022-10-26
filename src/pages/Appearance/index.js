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
import { Navigate, useNavigate } from "react-router-dom";

const AppearancePage = ({ setBreadcrumb, setAction, setMessage }) => {
  const [appearance, setAppearance] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [updateState, setUpdateState] = useState(true);

  useEffect(() => {
    setActiveTab(0);
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

      try {
        const response = await appearanceService.getApplicationAppearance(0, 5);
  
        switch(response.status) {
          case 200:
            setAppearance(new Appearance(response.data));
            break;
          default:
            navigate('/error-500');
        }
      } catch (e) {
        switch(e.response.status) {
          case 400:
          case 401:
            navigate('/error-401');
            break;
          case 404:
            navigate('/error-404');
            break;
          default:
            navigate('/error-500');
        }
      }
    };

    fetchAppearance();
  }, [updateState]);

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
    await appearanceService.updateApplicationAppearance(appearance, 0, 5)
    .then((res) => {
      switch(res.status) {
        case 200:
          setMessage({
            severity: 'success',
            text: 'La apariencia ha sido actualizada correctamente'
          });
          setUpdateState(!!updateState);
          break;
        default:
          navigate('/error-500');
      }
    })
    .catch((e) => {
        switch(e.response.status) {
          case 400:
          case 401:
            navigate('/error-401');
            break;
          case 404:
            navigate('/error-404');
            break;
          default:
            navigate('/error-500');
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
