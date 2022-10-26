import React from "react";

import TextField from '@mui/material/TextField';
import ImageUploader from "../../components/ImageUploader";
import { FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";

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
                <ImageUploader selectedFile={logo} setSelectedFile={onNewLogoSelected} dialogType='del logo' />
                </div>
              </Tooltip>
      
      <TextField id="outlined-basic" label="Nombre de aplicación" variant="outlined"
          className="app-name-input"
          error={!!errorMessages.appName}
         value={appName} onChange={onAppNameChange}
         helperText={errorMessages.appName}/>
    </div>
         
    </>
  );
}

export default Brand;