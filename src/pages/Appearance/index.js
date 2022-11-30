import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ButtonGroup } from "@mui/material";
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

import './styles.css';
import AppearancePreview from "./previews/AppearancePreview";
import AppearanceTabs from "./AppearanceTabs";
import Brand from "./sections/Brand";
import CategoriesScreenPreview from "./previews/CategoriesScreenPreview";
import Gameplay from "./sections/Gameplay";
import LoginPreview from "./previews/LoginPreview";
import Palette from "./sections/Palette";
import AppearanceValidator from "../../validators/entity/AppearanceValidator";
import appearanceServices from '../../services/appearence';
import categoryServices from "../../services/category";
import { getRedirectBasedOnResponseStatus } from "../../helpers";
import APPEARANCE_STRINGS from "../../resources/strings/appearance";

const AppearancePage = ({ setMessage, setAppBarContent }) => {
  const [appearance, setAppearance] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [updateState, setUpdateState] = useState(true);
  const [selectedPreview, setSelectedPreview] = useState(1);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    setActiveTab(0);
    updateAction();
    async function fetchAppearance() {

      try {
        const appearanceResponse = await appearanceServices.getApplicationAppearance();

        if (appearanceResponse?.status !== 200) {   
          throw { response: appearanceResponse };       
        }

        const categoriesResponse = await categoryServices.getCategories(7);

        if (categoriesResponse?.status !== 200) {   
          throw { response: categoriesResponse };       
        }

        setAppearance(appearanceResponse.data);
        setCategories(categoriesResponse.data);
      } catch (e) {
        navigate(
          getRedirectBasedOnResponseStatus(e.response),
        );
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
    const breadcrumb = APPEARANCE_STRINGS.BREADCRUMB;
    const action = {
      name: APPEARANCE_STRINGS.SAVE_CHANGES,
      icon: faFloppyDisk,
      onActionClick: onSaveAppearanceChangesClick,
    };
    setAppBarContent(breadcrumb, action);
  }

  const onSaveAppearanceChangesClick = async() => {
    const appearanceValidator = new AppearanceValidator(appearance);

    const newMessages = appearanceValidator.validate();
    setErrorMessages(newMessages);
  
    if (Object.keys(newMessages).length === 0) {
    await appearanceServices.updateApplicationAppearance(appearance)
    .then((res) => {
      switch(res.status) {
        case 200:
          setMessage(APPEARANCE_STRINGS.UPDATE_SUCCESS);
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
      <button className={`action-btn first ${selectedPreview === 1 ? 'selected' : ''}`} onClick={() => setSelectedPreview(1)}>{ APPEARANCE_STRINGS.MOBILE_SCREENS.LOGIN }</button>
  <button className={`action-btn middle ${selectedPreview === 2 ? 'selected' : ''}`} onClick={() => setSelectedPreview(2)}>{ APPEARANCE_STRINGS.MOBILE_SCREENS.CATEGORIES }</button>
  <button className={`action-btn last ${selectedPreview === 3 ? 'selected' : ''}`} onClick={() => setSelectedPreview(3)}>{ APPEARANCE_STRINGS.MOBILE_SCREENS.QUESTION }</button>
</ButtonGroup>
<div className="preview-container">
{selectedPreview === 1 && <LoginPreview
      {...appearance}
      />}
            {selectedPreview === 2 && categories && <CategoriesScreenPreview
      {...appearance} categories={categories}
      />}
                  {selectedPreview === 3 && <AppearancePreview
      {...appearance}
            />}
</div>
      </Card>
      </div>}
    </>
  );
}

export default AppearancePage;
