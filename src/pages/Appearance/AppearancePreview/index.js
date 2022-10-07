import React from "react";

import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Card from '@mui/material/Card';

const AppearancePreview = ({appName}) => {
  return (
    <Card className="preview-card">
        <div className="mobile-device">
          <div className="mobile-header">
          <FontAwesomeIcon icon={faBars} />
          <p className="mobile-app-name">{appName}</p>
          </div>
        </div>
    </Card>
  );
}

export default AppearancePreview;