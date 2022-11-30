import React from "react";
import { TextField, Tooltip } from '@mui/material';

import ImageUploader from "../../../../components/ImageUploader";
import APPEARANCE_STRINGS from "../../../../resources/strings/appearance";

const Brand = ({appearance, setAppearance, errorMessages, setErrorMessages}) => {
  const { appName, logo } = appearance;

  const onAppNameChange = (e) => {
    const newAppName = e.target.value;
    setAppearance({ ...appearance, appName: newAppName});
    setErrorMessages({ ...errorMessages, appName: undefined });
  }

  const onNewLogoSelected = (newLogo) => {
    setAppearance({ ...appearance, logo: newLogo});
    setErrorMessages({ ...errorMessages, logo: undefined });
  };

  return (
    <>
    <div className="brand first-row">
    <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                open={!!errorMessages.logo}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={errorMessages.logo}
                arrow
              >
                <div>
                <ImageUploader selectedFile={logo} setSelectedFile={onNewLogoSelected} dialogType={ APPEARANCE_STRINGS.BRAND_SECTION.OF_LOGO } />
                </div>
              </Tooltip>
      
      <TextField id="outlined-basic" label={ APPEARANCE_STRINGS.BRAND_SECTION.APP_NAME } variant="outlined"
          className="app-name-input"
          error={!!errorMessages.appName}
         value={appName} onChange={onAppNameChange}
         helperText={errorMessages.appName}/>
    </div>
         
    </>
  );
}

export default Brand;