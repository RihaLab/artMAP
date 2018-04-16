import React from 'react';

export default function SingleEnd() {
  const fontStyle = {
    fontFamily: 'Roboto',
    fontSize: '28px',
    stroke: 'black',
    fill: 'black',
  };
  return (
    <svg viewBox="0 0 500 300" width="100%">
      <rect
        height="210"
        width="400"
        x="50"
        y="50"
        fillOpacity="0"
        stroke="#76C045"
        strokeWidth="10"
      />


      <rect height="20" width="360" x="70" y="150" fill="#EF681F" />
      <g strokeWidth="3" stroke="black">
        <line x1="70" y1="135" x2="171" y2="135" />
        <line x1="148" y1="125" x2="170" y2="135" />
        <line x1="148" y1="145" x2="170" y2="135" />

      </g>
      <g opacity="0.87" style={fontStyle}>
        <text x="450" y="30" textAnchor="end">Single-end data</text>
        <text x="70" y="123" textAnchor="start" style={{ fontSize: '22px' }}>Read 1</text>
      </g>
    </svg>
  );
}
