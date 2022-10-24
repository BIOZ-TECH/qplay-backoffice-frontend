import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AppSnackBar = ({message}) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = (e) => {
        setOpen(false);
      };
  return (
    <>
    { message &&
    <Snackbar open={open} onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
      {message.text}
    </Alert>
  </Snackbar>}
    </>
  );
};

export default AppSnackBar;