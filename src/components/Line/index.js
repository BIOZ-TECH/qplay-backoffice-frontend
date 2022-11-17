import React from "react";

import './styles.css';

const Line = (props) => {
  const { borderColor, rowPosition } = props;
  return (
    <div style={{ width: '100%', transform: rowPosition === 0 ? 'scale(1, -1)' : 'scale(1, 1)' }}>
<div className="line-container">
  <div className="line-piece left">
    <div className="piece"  style={{ borderColor: `transparent transparent ${borderColor} ${borderColor}` }}></div>
  </div>
  <div className="line-piece right">
    <div className="piece" style={{ borderColor: `${borderColor} ${borderColor} transparent transparent` }}></div>
  </div>
</div>
    </div>
  );
}

export default Line;