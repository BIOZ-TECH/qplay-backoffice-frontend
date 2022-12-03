import React, { useEffect, useState } from "react";

import "./styles.css";
import ConfigSelector from "./ConfigSelector";
import APPEARANCE_STRINGS from "../../../../resources/strings/appearance";

const Gameplay = (props) => {
  const { appearance, setAppearance } = props;
  const [ blockProgress, setBlockProgress ] = useState(0);
  const [ examMode, setExamMode ] = useState(0);


  useEffect(() => {
    setBlockProgress(!appearance.gameplaySettings?.progressOn ? 1 : 0);
    setExamMode(!appearance.gameplaySettings?.examsOn ? 1 : 0);
  }, [])

  useEffect(() => {
    setAppearance({
      ...appearance,
      gameplaySettings: {
        ...appearance.gameplaySettings,
        progressOn: APPEARANCE_STRINGS.GAMEPLAY_SECTION.PROGRESS_CONFIG_OPTIONS[blockProgress].value,
      }
    });
  }, [ blockProgress ]);

  useEffect(() => {
    setAppearance({
      ...appearance,
      gameplaySettings: {
        ...appearance.gameplaySettings,
        examsOn: APPEARANCE_STRINGS.GAMEPLAY_SECTION.EXAMS_MODE_OPTIONS[examMode].value,
      }
    });
  }, [ examMode ]);

  return (
    <div className="gameplay">
      <ConfigSelector
        name={ APPEARANCE_STRINGS.GAMEPLAY_SECTION.PROGRESS_CONFIG }
        configOptions={ APPEARANCE_STRINGS.GAMEPLAY_SECTION.PROGRESS_CONFIG_OPTIONS }
        selectedConfig={ blockProgress }
        setSelectedConfig={ setBlockProgress }
      />
      {/*<ConfigSelector
        name={ APPEARANCE_STRINGS.GAMEPLAY_SECTION.EXAMS_MODE }
        selectorClass="no-first"
        configOptions={ APPEARANCE_STRINGS.GAMEPLAY_SECTION.EXAMS_MODE_OPTIONS }
        selectedConfig={ examMode }
        setSelectedConfig={ setExamMode }
  />*/}
    </div>
  );
}

export default Gameplay;