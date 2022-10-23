import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InflatedFeedback from "../../../../entities/InflatedFeedback";

import "./styles.css";

const InflatedFeedbackEdition = ({ inflatedFeedback, setInflatedFeedback }) => {
    const [inflatedFeedbackType, setInflatedFeedbackType] = useState("only-text");
    const [imageInput, setImageInput] = useState('');
    const [videoInput, setVideoInput] = useState('');

    useEffect(() => {
      if (!inflatedFeedback) {
        setInflatedFeedback(new InflatedFeedback({}));
      } else {
        initializeView();
      }
    }, []);


    const initializeView = () => {
      const newInflatedFeedbackType = inflatedFeedback.videoPermalink ? 'text-and-video'
      : (
        inflatedFeedback.imagePermalink ? 'text-and-image' : 'only-text'
      );
      setInflatedFeedbackType(newInflatedFeedbackType);

      switch(newInflatedFeedbackType) {
        case 'text-and-image':
          setImageInput(inflatedFeedback.imagePermalink);
          break;
        case 'text-and-video':
          setVideoInput(inflatedFeedback.videoPermalink);
          break;
      }

    }

    useEffect(() => {
      if (inflatedFeedbackType === "only-text") {
        const newInflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, imagePermalink: null, videoPermalink: null });
        setInflatedFeedback(newInflatedFeedback);
      }
    }, [inflatedFeedbackType]);
  
    const handleInflatedFeedbackTypeChange = (e) => {
      const newInflatedFeedbackType = e.target.value;
      if (newInflatedFeedbackType) {
        switch (newInflatedFeedbackType) {
          case "only-text":
            const newnflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, imagePermalink: '', videoPermalink: '' });
            setInflatedFeedback(newnflatedFeedback);
            setImageInput('');
            setVideoInput('');
            break;
          case "text-and-image":
            const newIflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, videoPermalink: '' });
            setInflatedFeedback(newIflatedFeedback);
            setVideoInput('');
            break;
          case "text-and-video":
            const newInfatedFeedback = new InflatedFeedback({ ...inflatedFeedback, imagePermalink: '' });
            setInflatedFeedback(newInfatedFeedback);
            setImageInput('');
            break;
        }

        setInflatedFeedbackType(e.target.value);
      }
    }

    const onInflatedFeedbackDescriptionImageChange = (e) => {
      const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
      const inputValue = e.target.value;
  
      if (urlImageRegex.test(inputValue)) {
        const newInflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, imagePermalink: inputValue, videoPermalink: '' });
        setInflatedFeedback(newInflatedFeedback);
      }

      setImageInput(inputValue);
    }

    const onInflatedFeedbackDescriptionVideoChange = (e) => {
      const urlVideoRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;
      const inputValue = e.target.value;

      if (urlVideoRegex.test(inputValue)) {
        const newInflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, videoPermalink: inputValue, imagePermalink: '' });
        setInflatedFeedback(newInflatedFeedback);
      }

      setVideoInput(inputValue);
    }
  return (
    <div className="inflated-feedback-container">

          <FormControl fullWidth id="inflated-feedback-type">
        <InputLabel id="inflated-feedback-type-label">¿Qué contiene?</InputLabel>
        <Select
    labelId="inflated-feedback-type-label"
    id="inflated-feedback-type-select"
    value={inflatedFeedbackType}
    label="¿Qué contiene?"
    onChange={handleInflatedFeedbackTypeChange}
        >
    <MenuItem value="only-text">Solo texto</MenuItem>
    <MenuItem value="text-and-image">Texto e imagen</MenuItem>
    <MenuItem value="text-and-video">Texto y video multimedia</MenuItem>
        </Select>
      </FormControl>

      { inflatedFeedbackType === 'text-and-image'
      && (
        <div className="feedback-image-input">
        <TextField id="inflated-feedback-image-input" label="Enlace de imagen" variant="outlined" fullWidth
        value={imageInput}
        onChange={onInflatedFeedbackDescriptionImageChange}
        />
        </div>
      )}
            { inflatedFeedbackType === 'text-and-video'
      && (
        <div className="feedback-video-input">
        <TextField id="inflated-feedback-video-input" label="Enlace de video" variant="outlined" fullWidth
        value={videoInput}
        onChange={onInflatedFeedbackDescriptionVideoChange}
        />
        </div>
      )}
    </div>
  );
}

export default InflatedFeedbackEdition;