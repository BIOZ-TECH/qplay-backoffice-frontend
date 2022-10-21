import React from "react";

import TextField from '@mui/material/TextField';
import ImageUploader from "../../components/ImageUploader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Brand = ({appearance, setAppearance}) => {
  const { appName, logo } = appearance;

  const onAppNameChange = (e) => {
    const newAppName = e.target.value;
    setAppearance({ ...appearance, appName: newAppName})
  }

  const onNewLogoSelected = (newLogo) => {
    setAppearance({ ...appearance, logo: newLogo});
  };

  return (
    <>
    <div className="brand first-row">
      <ImageUploader selectedFile={logo} setSelectedFile={onNewLogoSelected} />
      <TextField id="outlined-basic" label="Nombre de aplicación" variant="outlined"
          className="app-name-input"
         value={appName} onChange={onAppNameChange}/>
    </div>
         
    </>
  );
}

export default Brand;