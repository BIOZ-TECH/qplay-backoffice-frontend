import React from "react";
import { Card } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

const ConfigSelector = (props) => {
  const { name, selectorClass, configOptions, selectedConfig, setSelectedConfig } = props;

  const handleToLeftConfigClick = (e) => {
    const newSelectedConfig = selectedConfig - 1 < 0 ? configOptions.length - 1 : selectedConfig - 1;
    setSelectedConfig(newSelectedConfig);
  }

  const handleToRightConfigClick = (e) => {
    const newSelectedConfig = selectedConfig + 1 === configOptions.length ? 0 : selectedConfig + 1;
    setSelectedConfig(newSelectedConfig);
  }

  return (
    <div className={ `config ${selectorClass}` }>
      <p className="name">{ name }</p>
      <div className="selector">
        <Card className="change-config to-left" onClick={handleToLeftConfigClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Card>
        <Card className="info" style={{ backgroundColor: configOptions[selectedConfig].backgroundColor, color: configOptions[selectedConfig].fontColor }}>
          <div className="main">
            <FontAwesomeIcon icon={configOptions[selectedConfig].icon} />
            <p>{ configOptions[selectedConfig].name }</p>
          </div>
          <p>{ configOptions[selectedConfig].detail }</p>
        </Card>
        <Card className="change-config to-right" onClick={handleToRightConfigClick}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Card>
      </div>
    </div>
  );
}

export default ConfigSelector;