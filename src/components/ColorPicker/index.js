import React from 'react'
import { MuiColorInput } from 'mui-color-input'

const ColorPicker = () => {
  const [color, setColor] = React.useState('#ffffff')

  const onColorChange = (color) => {
    setColor(color)
  }

  return (
    <MuiColorInput value={color} onChange={onColorChange} />
  )
}

export default ColorPicker;