import React from "react";

import './styles.css';

const Line = (props) => {
  const { borderColor, rowPosition } = props;
  return (
    <div style={{ width: '100%', transform: rowPosition === 0 ? 'scale(1, -1)' : 'scale(1, 1)' }}>
<div class="line-container">
  <div class="line-piece left">
    <div class="piece"  style={{ borderColor: `transparent transparent transparent ${borderColor}` }}></div>
  </div>
  <div class="line-piece right">
    <div class="piece" style={{ borderColor: `transparent ${borderColor} transparent transparent` }}></div>
  </div>
</div>
    </div>
  );
}

export default Line;