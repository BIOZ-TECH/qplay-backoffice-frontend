import React from "react";

import HeaderAndButtonsPalette from "./palettes/HeaderAndButtonsPalette";
import BackgroundAndOvergroundPalette from "./palettes/BackgroundAndOvergroundPalette";
import LettersPalette from "./palettes/LettersPalette";
import SelectableAnswersPalette from "./palettes/SelectableAnswersPalette";

const Palette = (props) => {
  return (
    <>
    <HeaderAndButtonsPalette
    {...props}
    />
        <BackgroundAndOvergroundPalette
    {...props}
    />
            <SelectableAnswersPalette
    {...props}
    />
        <LettersPalette
    {...props}
    />
    </>
  );
}

export default Palette;