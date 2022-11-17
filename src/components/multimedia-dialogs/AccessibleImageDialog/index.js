import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose} from '@fortawesome/free-solid-svg-icons'

import "./styles.css";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const AccessibleImageDialog = ({ open, setOpen, selectedFile, imageAccessibility, setImageData, dialogType }) => {
    const [imageInput, setImageInput] = useState(null);
    const [imageAccessibilityInput, setImageAccessibilityInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
      setImageInput(selectedFile);
      setImageAccessibilityInput(imageAccessibility);
    }, [selectedFile, imageAccessibility]);
  
    const onDialogClose = () => {
        setImageInput(selectedFile);
        setErrorMessage(null);
      setOpen(false);
    };

    const onDialogConfirm = () => {
      let newErrors = {};
      const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');

      if (imageInput?.trim() && !urlImageRegex.test(imageInput)) {
        newErrors = {
          urlError: 'Por favor, especifique un enlace de imágen en formato jpg, jpeg o png',
        };
      }

      if (imageInput?.trim() && !imageAccessibilityInput?.trim()) {
        newErrors = {
          ...newErrors,
          accessibilityError: 'Por favor, especifique un texto de accesibilidad de la imagen',
        }
      }
    
      if (Object.keys(newErrors).length === 0) {
        setImageData(imageInput, imageAccessibilityInput);

        setOpen(false);
      } else {
        setErrorMessage(newErrors);
      }
    };

const onCategoryImageChange = (e) => {
  const inputValue = e.target.value;

  setImageInput(inputValue);
  setErrorMessage(null);
}

const handleImageAccessibilityChange = (e) => {
  const inputValue = e.target.value;

  setImageAccessibilityInput(inputValue);
  setErrorMessage(null);
}

    return (
        <Dialog className="image-uploader-dialog image-accessibility" open={open} onClose={onDialogClose}>
        <DialogTitle>Enlace de imagen {dialogType}</DialogTitle>
        <DialogContent>
        <TextField id="category-image-input" variant="outlined" fullWidth
        label="Enlace de imagen"
        value={imageInput}
        onChange={onCategoryImageChange}
        type="url"
        error={!!errorMessage?.urlError}
        helperText={errorMessage?.urlError}
        />
        <TextField id="category-image-accessibility-input" variant="outlined" fullWidth
        label="Texto para accesibilidad de imagen"
        value={imageAccessibilityInput}
        onChange={handleImageAccessibilityChange}
        error={!!errorMessage?.accessibilityError}
        helperText={errorMessage?.accessibilityError}
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

export default AccessibleImageDialog;