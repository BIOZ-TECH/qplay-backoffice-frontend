import React, { useEffect, useState } from "react";
import { faChildReaching, faFlagCheckered, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import ConfigSelector from "./ConfigSelector";

const Gameplay = (props) => {
  const { appearance, setAppearance } = props;
  const [ blockProgress, setBlockProgress ] = useState(0);
  const [ examMode, setExamMode ] = useState(0);
  const blockProgressOptions = [
    {
        name: 'Modo desafío',
        icon: faFlagCheckered,
        detail: 'En este modo el jugador deberá completar una categoría para desbloquear la siguiente categoría',
        backgroundColor: '#ee645a',
        fontColor: 'white',
        value: true,
    },
    {
        name: 'Modo libertad',
        icon: faChildReaching,
        detail: 'En este modo el jugador tendrá todas las categorías desbloqueadas desde un principio',
        backgroundColor: '#4ebf91',
        fontColor: 'white',
        value: false,
    }
  ];
  const examModeOptions = [
    {
        name: 'ON',
        icon: faToggleOn,
        detail: 'El jugador no visualizará evaluaciones en las categorías',
        backgroundColor: '#66c05f',
        fontColor: 'white',
        value: true,
    },
    {
        name: 'OFF',
        icon: faToggleOff,
        detail: 'El jugador visualizará una evaluación en cada categoría',
        backgroundColor: '#e74c4c',
        fontColor: 'white',
        value: false,
    }
  ];

  useEffect(() => {
    setBlockProgress(!appearance.gameplaySettings?.progressOn ? 1 : 0);
    setExamMode(!appearance.gameplaySettings?.examsOn ? 1 : 0);
  }, [])

  useEffect(() => {
    setAppearance({
      ...appearance,
      gameplaySettings: {
        ...appearance.gameplaySettings,
        progressOn: blockProgressOptions[blockProgress].value,
      }
    });
  }, [ blockProgress ]);

  useEffect(() => {
    setAppearance({
      ...appearance,
      gameplaySettings: {
        ...appearance.gameplaySettings,
        examsOn: examModeOptions[examMode].value,
      }
    });
  }, [ examMode ]);

  return (
    <div className="gameplay">
      <ConfigSelector
        name="Modo de juego"
        configOptions={ blockProgressOptions }
        selectedConfig={ blockProgress }
        setSelectedConfig={ setBlockProgress }
      />
      {/*<ConfigSelector
        name="Modo de evaluaciones"
        selectorClass="no-first"
        configOptions={ examModeOptions }
        selectedConfig={ examMode }
        setSelectedConfig={ setExamMode }
  />*/}
    </div>
  );
}

export default Gameplay;