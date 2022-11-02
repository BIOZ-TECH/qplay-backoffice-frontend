import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const YoutubeEmbed = ({ youtubeLink }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={youtubeLink}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;