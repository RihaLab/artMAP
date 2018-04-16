import React from 'react';

export default function SingleEnd() {
  return (
    <svg viewBox="0 0 500 300" width="100%">
      <rect height="210" width="400" x="50" y="50" className="svg-image" />
      <rect height="20" width="360" x="70" y="150" className="svg-read" />

      <g strokeWidth="3" stroke="black">
        <line x1="70" y1="135" x2="171" y2="135" />
        <line x1="148" y1="125" x2="170" y2="135" />
        <line x1="148" y1="145" x2="170" y2="135" />
      </g>
      <g className="svg-text">
        <text x="70" y="123" textAnchor="start">Read 1</text>
      </g>
    </svg>
  );
}
