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
import Gameplay from "./Gameplay";
import CategoriesScreenPreview from "./AppearancePreview/CategoriesScreenPreview";
import { Button, ButtonGroup } from "@mui/material";
import LoginPreview from "./AppearancePreview/LoginPreview";

const AppearancePage = ({ setBreadcrumb, setAction, setMessage }) => {
  const [appearance, setAppearance] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [updateState, setUpdateState] = useState(true);
  const [selectedPreview, setSelectedPreview] = useState(1);

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
        const response = await appearanceService.getApplicationAppearance();
  
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
    await appearanceService.updateApplicationAppearance(appearance)
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
            { activeTab === 2 && 
      <Gameplay
      appearance={appearance}
      setAppearance={setAppearance}
      />}
      </Card>
      <Card className="preview-card">
      <ButtonGroup className="preview-btn-group" variant="contained" aria-label="outlined primary button group">
      <button className={`action-btn first ${selectedPreview === 1 ? 'selected' : ''}`} onClick={() => setSelectedPreview(1)}>Inicio de sesión</button>
  <button className={`action-btn middle ${selectedPreview === 2 ? 'selected' : ''}`} onClick={() => setSelectedPreview(2)}>Listado de categorías</button>
  <button className={`action-btn last ${selectedPreview === 3 ? 'selected' : ''}`} onClick={() => setSelectedPreview(3)}>Pregunta</button>
</ButtonGroup>
{selectedPreview === 1 && <LoginPreview
      {...appearance}
      />}
            {selectedPreview === 2 && <CategoriesScreenPreview
      {...appearance}
      />}
                  {selectedPreview === 3 && <AppearancePreview
      {...appearance}
            />}
      </Card>
      </div>}
    </>
  );
}

export default AppearancePage;
