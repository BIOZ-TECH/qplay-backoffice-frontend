import React from 'react'
import { MuiColorInput } from 'mui-color-input'

const ColorPicker = ({ color, setColor }) => {
  const onColorChange = (color) => {
    setColor(color)
  }

  return (
    <MuiColorInput value={color} onChange={onColorChange} format="hex" />
  )
}

export default ColorPicker;