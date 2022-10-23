import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import React, { createRef, useEffect, useState } from "react";
import YoutubeEmbed from "../../../../components/YoutubeEmbed";
import InflatedFeedback from "../../../../entities/InflatedFeedback";

import "./styles.css";

const FeedbackPreview = ({ feedbackResultType, inflatedFeedback, setInflatedFeedback }) => {

    const statementInput = createRef();
    const [feedbackStyle, setFeedbackStyle] = useState({});
    const [videoLink, setVideoLink] = useState(null);
    
    useEffect(() => {
      if(!inflatedFeedback) setInflatedFeedback(new InflatedFeedback({}));
    }, []);

    useEffect(() => {
      if (!!inflatedFeedback?.videoPermalink) setVideoLink(getVideoId());
    }, [inflatedFeedback]);

    useEffect(() => {
      switch(feedbackResultType) {
        case 'correct':
          setFeedbackStyle({
            backgroundColor: '#21bd21',
            title: 'Feedback para respuesta correcta',
          });
          break;
        case 'incorrect':
          setFeedbackStyle({
            backgroundColor: '#ed3535',
            title: 'Feedback para respuestas incorrectas',
          });
          break;
        default:
          setFeedbackStyle({
            backgroundColor: 'gray',
            title: 'Feedback para todas las respuestas',
          });
      }
    }, [feedbackResultType]);
  
    const onStatementEditClick = () => {
      statementInput.current.children[0].focus();
    }  

   const getVideoId = () => {
    const youtubeLinkIdRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/;
    const youtubeId = inflatedFeedback.videoPermalink.match(youtubeLinkIdRegex);
    console.log(`https://www.youtube.com/embed/${youtubeId[1]}`);

    return `https://www.youtube.com/embed/${youtubeId[1]}`;
   }

   const onFeedbackStatementChange = (e) => {
    setInflatedFeedback(new InflatedFeedback({ ...inflatedFeedback, statement: e.target.value}));
   }

  return (
    <div className='inflated-feedback-preview-container'>

      { feedbackStyle.title && <p className="feedback-title">{feedbackStyle.title}</p>}
          <div className="inflated-feedback-preview" style={{ backgroundColor: feedbackStyle.backgroundColor }}>
          <FormControl fullWidth>
          <OutlinedInput
            id="feedback-statement-input"
            className="feedback-statement"
            endAdornment={<InputAdornment position="end"><FontAwesomeIcon onClick={onStatementEditClick} className="edit-adornment" icon={faPencil} /></InputAdornment>}
            placeholder="Enunciado del feedback"
            multiline
            ref={statementInput}
            onChange={onFeedbackStatementChange}
            value={inflatedFeedback?.statement}
          />
        </FormControl>
        {
            inflatedFeedback?.imagePermalink
            && (
                <img src={inflatedFeedback.imagePermalink} />
            )
        }
                {
            videoLink
            && (
                <YoutubeEmbed youtubeLink={videoLink} />
            )
        }
    </div>
    </div>
  );
}

export default FeedbackPreview;