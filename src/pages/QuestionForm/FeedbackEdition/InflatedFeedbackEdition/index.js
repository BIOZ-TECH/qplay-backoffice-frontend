import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InflatedFeedback from "../../../../entities/InflatedFeedback";

import "./styles.css";

const InflatedFeedbackEdition = ({ inflatedFeedback, setInflatedFeedback }) => {
    const [inflatedFeedbackType, setInflatedFeedbackType] = useState("only-text")

    useEffect(() => {
      if (inflatedFeedback === null) setInflatedFeedback(new InflatedFeedback({}));
    }, []);

    useEffect(() => {
      if (inflatedFeedback === "only-text") {
        const newInflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, imagePermalink: '', videoPermalink: '' });
        setInflatedFeedback(newInflatedFeedback);
      }
    }, [inflatedFeedback]);
  
    const handleInflatedFeedbackTypeChange = (e) => {
      const inflatedFeedbackType = e.target.value;
      if (inflatedFeedbackType)
      setInflatedFeedbackType(e.target.value);
    }

    const onInflatedFeedbackDescriptionImageBlur = (e) => {
      const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
      const inputValue = e.target.value;
  
      if (urlImageRegex.test(inputValue)) {
        const newInflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, imagePermalink: inputValue, videoPermalink: '' });
        setInflatedFeedback(newInflatedFeedback);
      }
    }

    const onInflatedFeedbackDescriptionVideoBlur = (e) => {
      const urlVideoRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/;
      const inputValue = e.target.value;

      if (urlVideoRegex.test(inputValue)) {
        const newInflatedFeedback = new InflatedFeedback({ ...inflatedFeedback, videoPermalink: inputValue, imagePermalink: '' });
        setInflatedFeedback(newInflatedFeedback);
      }
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
        onBlur={onInflatedFeedbackDescriptionImageBlur}
        />
        </div>
      )}
            { inflatedFeedbackType === 'text-and-video'
      && (
        <div className="feedback-video-input">
        <TextField id="inflated-feedback-video-input" label="Enlace de video" variant="outlined" fullWidth
        onBlur={onInflatedFeedbackDescriptionVideoBlur}
        />
        </div>
      )}
    </div>
  );
}

export default InflatedFeedbackEdition;