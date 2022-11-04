import { faCheck, faClose, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import YoutubeEmbed from "../../../components/YoutubeEmbed";

import "./styles.css";

const FeedbackPreview = ({ feedbackResultType, inflatedFeedback }) => {
    const [feedbackStyle, setFeedbackStyle] = useState({});

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
          });
      }
    }, [feedbackResultType]);

   const getVideoId = () => {
    const youtubeLinkIdRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/;
    const youtubeId = inflatedFeedback.videoPermalink.match(youtubeLinkIdRegex);

    return youtubeId[1];
   }

  return (
    <div className='inflated-feedback-preview container'>
          <div className={`inflated-feedback ${feedbackResultType}`} style={{ backgroundColor: feedbackStyle.backgroundColor }}>

              <div className={`ear ${feedbackResultType}`}>
                <p>{`Feedback ${feedbackResultType === 'any' ? 'único' : `ante respuesta${ feedbackResultType === 'correct' ? ' correcta' : 's incorrectas' }` }`}</p>
                <FontAwesomeIcon className="ear-type" icon={feedbackResultType === 'any' ? faCommentDots : (feedbackResultType === 'correct' ? faCheck : faClose)} />
                </div>

          <div className="feedback-data">
          <div className="statement">{inflatedFeedback.statement}</div>
        {
            inflatedFeedback?.imagePermalink
            && (
                <img src={inflatedFeedback.imagePermalink} />
            )
        }
                {
            inflatedFeedback?.videoPermalink
            && (
                <YoutubeEmbed youtubeLink={`https://www.youtube.com/embed/${getVideoId()}`} />
            )
        }
          </div>
    </div>
    </div>
  );
}

export default FeedbackPreview;