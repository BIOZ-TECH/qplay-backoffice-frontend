import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faCross, faUpload } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

const VideoDialog = ({ open, setOpen, selectedFile, setSelectedFile, dialogType }) => {
    const [videoInput, setVideoInput] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);

    /*useEffect(() => {
      setImageInput(selectedFile);
    }, []);*/

    useEffect(() => {
        setVideoInput(selectedFile);
    }, [selectedFile]);
  
    const onDialogClose = () => {
        setVideoInput(selectedFile);
        setErrorMessage(null);
      setOpen(false);
    };

    const onDialogConfirm = () => {
        const urlVideoRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;
    
      if (urlVideoRegex.test(videoInput) || !videoInput) {
        setSelectedFile(videoInput);
        
        setOpen(false);
      } else {
        setErrorMessage('Por favor, especifique un enlace de imágen en formato jpg, jpeg o png');
      }
    };

const onCategoryImageChange = (e) => {
  const inputValue = e.target.value;

  setVideoInput(inputValue);
  setErrorMessage(null);
}

    return (
        <Dialog className="image-uploader-dialog" open={open} onClose={onDialogClose}>
        <DialogTitle>Enlace de video {dialogType}</DialogTitle>
        <DialogContent>
        <TextField id="category-image-input" label="" variant="outlined" fullWidth
        value={videoInput}
        onChange={onCategoryImageChange}
        type="url"
        error={!!errorMessage}
        helperText={errorMessage}
        />
        </DialogContent>
        <DialogActions>
          <button className="cancel-dialog-btn dialog-btn" type="button" onClick={onDialogClose}>
              <FontAwesomeIcon className="mr-2" icon={faClose} />
                Cancelar
            </button>
            <button className="confirm-dialog-btn dialog-btn" type="button" onClick={onDialogConfirm}>
              <FontAwesomeIcon className="mr-2" icon={faCheck} />
                Confirmar
            </button>
        </DialogActions>
      </Dialog>
    );
};

export default VideoDialog;