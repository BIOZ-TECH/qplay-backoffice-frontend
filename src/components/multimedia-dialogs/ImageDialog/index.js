import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faCross, faUpload } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const ImageDialog = ({ open, setOpen, selectedFile, setSelectedFile, dialogType }) => {

    //const [imageUploaded, setImageUploaded] = useState(false);
    const [imageInput, setImageInput] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);

    /*useEffect(() => {
      setImageInput(selectedFile);
    }, []);*/

    useEffect(() => {
      setImageInput(selectedFile);
    }, [selectedFile]);
  
    const onDialogClose = () => {
        setImageInput(selectedFile);
        setErrorMessage(null);
      setOpen(false);
    };

    const onDialogConfirm = () => {
      const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
    
      if (urlImageRegex.test(imageInput) || !imageInput) {
        setSelectedFile(imageInput);
        
        setOpen(false);
      } else {
        setErrorMessage('Por favor, especifique un enlace de imágen en formato jpg, jpeg o png');
      }
    };

const onCategoryImageChange = (e) => {
  const inputValue = e.target.value;

  setImageInput(inputValue);
  setErrorMessage(null);
}

    return (
        <Dialog className="image-uploader-dialog" open={open} onClose={onDialogClose}>
        <DialogTitle>Enlace de imagen {dialogType}</DialogTitle>
        <DialogContent>
        <TextField id="category-image-input" label="" variant="outlined" fullWidth
        value={imageInput}
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

export default ImageDialog;