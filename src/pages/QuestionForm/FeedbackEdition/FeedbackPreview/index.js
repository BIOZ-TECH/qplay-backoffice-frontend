import React, { createRef, useEffect, useRef, useState } from "react";
import { Button, ClickAwayListener, FormControl, FormHelperText, Grow, InputAdornment, MenuItem, MenuList, OutlinedInput, Paper, Popper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPhotoFilm, faCommentDots, faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import ImageDialog from "../../../../components/multimedia-dialogs/ImageDialog";
import VideoDialog from "../../../../components/multimedia-dialogs/VideoDialog";
import YoutubeEmbed from "../../../../components/YoutubeEmbed";
import InflatedFeedback from "../../../../entities/InflatedFeedback";

const FeedbackPreview = ({ feedbackResultType, inflatedFeedback, setInflatedFeedback, errorMessages, setErrorMessages }) => {

  const [open, setOpen] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  const anchorRef = useRef(null);

    const statementInput = createRef();
    const [feedbackStyle, setFeedbackStyle] = useState({});
    const [videoLink, setVideoLink] = useState(null);
    const [inflatedFeedbackType, setInflatedFeedbackType] = useState(null);
    
    useEffect(() => {
      if(!inflatedFeedback) setInflatedFeedback(new InflatedFeedback({}));
    }, []);

    useEffect(() => {
      if (!!inflatedFeedback?.videoPermalink) setVideoLink(getVideoId());
    }, [inflatedFeedback]);

    useEffect(() => {
      setInflatedFeedbackType(
        feedbackResultType === 'incorrect' ? 'inflatedIncorrectFeedback' : 'inflatedFeedback'
      );
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


    return `https://www.youtube.com/embed/${youtubeId[1]}`;
   }

   const onFeedbackStatementChange = (e) => {
    setInflatedFeedback(new InflatedFeedback({ ...inflatedFeedback, statement: e.target.value}));
    setErrorMessages({
      ...errorMessages,
      [inflatedFeedbackType]: {
        ...errorMessages[inflatedFeedbackType],
        statement: null,
      },
    });
   }

   const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const onImageChange = (image) => {
    const newInfatedFeedback = {...inflatedFeedback, imagePermalink: image};

    if (image) {
      newInfatedFeedback.videoPermalink = null;
    }

    setInflatedFeedback(newInfatedFeedback);
  }

  const onVideoChange = (video) => {
    const newInfatedFeedback = {...inflatedFeedback, videoPermalink: video};

    if (video) {
      newInfatedFeedback.imagePermalink = null;
    }

    setInflatedFeedback(newInfatedFeedback);
  }

  return (
    <div className='inflated-feedback-preview-container'>
          <div className={`inflated-feedback-preview ${feedbackResultType}`} style={{ backgroundColor: feedbackStyle.backgroundColor }}>
          <div className={`ear ${feedbackResultType}`}>
                <p>{`Feedback ${feedbackResultType === 'any' ? 'único' : `ante respuesta${ feedbackResultType === 'correct' ? ' correcta' : 's incorrectas' }` }`}</p>
                <FontAwesomeIcon className="ear-type" icon={feedbackResultType === 'any' ? faCommentDots : (feedbackResultType === 'correct' ? faCheck : faClose)} />
                </div>
                <div className="feedback-data">
                <FormControl fullWidth
          error={!!errorMessages[inflatedFeedbackType]?.statement}>
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
          <FormHelperText className={errorMessages[inflatedFeedbackType]?.statement ? "feedback-statement-error" : ""}>{errorMessages[inflatedFeedbackType]?.statement}</FormHelperText>
        </FormControl>
        <div className="image-multimedia-container" style={{ width: inflatedFeedback && inflatedFeedback.videoPermalink ? '100%': 'fit-content' }}>
        <div style={{
          position: inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink) ? 'absolute' : 'relative',
          textAlign: inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink) ? 'none' : 'center',
          width: inflatedFeedback && inflatedFeedback.videoPermalink ? '75%': '100%',
          zIndex: 100 }}>
<Button
className={`multimedia-btn ${inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink) ? 'uploaded' : ''}`}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <FontAwesomeIcon className={!(inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink)) ? "mr-2" : ""}
          icon={(inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink)) ? faPencil : faPhotoFilm} />
          { !(inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink)) && <p>Agregar multimedia</p>}
          
        </Button>
        <Popper
        sx={{
          zIndex: 1,
        }}
        style={{ top:'auto', left: 'auto',
        right: (inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink)) ? 0 : 'auto',
        left: (inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink)) ? 'auto' : '50%',
        position: 'absolute' }}
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                <MenuItem
                      key="image-link"
                      onClick={() => setOpenImageDialog(true)}
                    >
                      Enlace de imagen
                    </MenuItem>
                    <MenuItem
                      key="video-link"
                      onClick={() => setOpenVideoDialog(true)}
                    >
                      Enlace de video
                    </MenuItem>
                    {inflatedFeedback && (inflatedFeedback.imagePermalink || inflatedFeedback.videoPermalink)
                    && <MenuItem
                      key="video-link"
                      onClick={() => setInflatedFeedback({...inflatedFeedback, imagePermalink: null, videoPermalink: null})}
                    >
                      Eliminar multimedia
                    </MenuItem>}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
</div>
{
            inflatedFeedback?.imagePermalink
            && (
              <div className="feedback-image-container">
                <img src={inflatedFeedback.imagePermalink} />
                </div>
                
            )
        }
                {
            inflatedFeedback?.videoPermalink && videoLink
            && (
              <div className="feedback-image-container">
                <YoutubeEmbed youtubeLink={videoLink} />
                </div>
            )
        }
        </div>
                  </div>
    </div>
    <ImageDialog
open={openImageDialog}
setOpen={setOpenImageDialog}
selectedFile={inflatedFeedback?.imagePermalink}
setSelectedFile={onImageChange}
dialogType="para feedback"
/>

<VideoDialog
open={openVideoDialog}
setOpen={setOpenVideoDialog}
selectedFile={inflatedFeedback?.videoPermalink}
setSelectedFile={onVideoChange}
dialogType="para feedback"
/>
    </div>
  );
}

export default FeedbackPreview;