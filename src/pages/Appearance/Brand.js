import React from "react";

import TextField from '@mui/material/TextField';

const Brand = ({appName, setAppName}) => {

  const onAppNameChange = (e) => {
    setAppName(e.target.value);
  }

  return (
    <>
        <TextField id="outlined-basic" label="Nombre de aplicación" variant="outlined"
         value={appName} onChange={onAppNameChange}/>
    </>
  );
}

export default Brand;