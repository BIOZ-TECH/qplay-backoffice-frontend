import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faCross, faUpload } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

const ImageUploader = ({ selectedFile, setSelectedFile, dialogType }) => {

    //const [imageUploaded, setImageUploaded] = useState(false);
    const [imageInput, setImageInput] = useState(null)
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      setImageInput(selectedFile);
    }, []);

    const onDialogOpen = () => {
      setOpen(true);
    };
  
    const onDialogClose = () => {
      setOpen(false);
    };

    const onDialogConfirm = () => {
      const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
    
      if (urlImageRegex.test(imageInput)) {
        setSelectedFile(imageInput);
      }
    
      setOpen(false);
    };

    /*const onUploadClick = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = function (e) {
          setSelectedFile([reader.result]);
        }.bind(this);

        setImageUploaded(true);
        setSelectedFile(file);
      };*/

    const renderUploadImageButton = () => (
      <div className="image-container" onClick={onDialogOpen}>
        <FontAwesomeIcon className="upload-icon" icon={faUpload} />
      </div>
        );
    
    const renderUploadedImage = () => (<div className="uploaded-container" onClick={onDialogOpen}>
    <FontAwesomeIcon className="upload-icon" icon={faUpload} />
    <img  className="image-container" src={selectedFile} />
    </div>);

const onCategoryImageChange = (e) => {
  const inputValue = e.target.value;

  setImageInput(inputValue);
}

    return (
      <>
        <div className="image-uploader">
      <div htmlFor="contained-button-file">
      { !selectedFile
                && renderUploadImageButton()}
            { !!selectedFile
                && renderUploadedImage()}
      </div>

        </div>
        <Dialog className="image-uploader-dialog" open={open} onClose={onDialogClose}>
        <DialogTitle>Enlace de imagen {dialogType}</DialogTitle>
        <DialogContent>
        <TextField id="category-image-input" label="" variant="outlined" fullWidth
        value={imageInput}
        onChange={onCategoryImageChange}
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
        </>
    );
};

export default ImageUploader;
