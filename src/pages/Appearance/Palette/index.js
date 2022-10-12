import React from "react";

import HeaderPalette from "./palettes/HeaderPalette";
import ButtonPalette from "./palettes/ButtonPalette";
import BackgroundPalette from "./palettes/BackgroundPalette";
import ComplementaryLettersPalette from "./palettes/ComplementaryLettersPalette";
import InputTextPalette from "./palettes/InputTextPalette";

const Palette = (props) => {
  return (
    <>
    <HeaderPalette
    {...props}
    />
        <ButtonPalette
    {...props}
    />
            <InputTextPalette
    {...props}
    />
        <BackgroundPalette
    {...props}
    />
        <ComplementaryLettersPalette
    {...props}
    />
    </>
  );
}

export default Palette;