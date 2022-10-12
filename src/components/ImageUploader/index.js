import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import "./styles.css";

const ImageUploader = ({ selectedFile, setSelectedFile }) => {

    const [imageUploaded, setImageUploaded] = useState(false);

    const onUploadClick = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = function (e) {
          setSelectedFile([reader.result]);
        }.bind(this);

        setImageUploaded(true);
        setSelectedFile(file);
      };

    const renderUploadImageButton = () => (
      <div className="image-container">
        <FontAwesomeIcon className="upload-icon" icon={faUpload} />
      </div>
        );
    
    const renderUploadedImage = () => (<div className="uploaded-container">
    <FontAwesomeIcon className="upload-icon" icon={faUpload} />
    <img  className="image-container" src={selectedFile} />
    </div>);

    return (
        <div className="image-uploader">
                <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={onUploadClick}
        className="image-input"
      />
      <label htmlFor="contained-button-file">
      { !imageUploaded
                && renderUploadImageButton()}
            { imageUploaded
                && renderUploadedImage()}
      </label>

        </div>
    );
};

export default ImageUploader;
