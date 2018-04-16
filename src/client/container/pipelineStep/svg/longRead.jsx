import React from 'react';

export default function LongRead() {
  const fontStyle = {
    fontFamily: 'Roboto',
    fontSize: '28px',
    stroke: 'black',
    fill: 'black',
  };
  return (
    <svg viewBox="0 0 500 300" width="100%">
      <defs>
        <symbol id="long-read" fill="#EF681F">
          <rect height="20" width="140" x="0" y="0" />
          <rect height="20" width="140" x="150" y="0" />
        </symbol>
      </defs>

      <rect
        height="210"
        width="400"
        x="50"
        y="50"
        fillOpacity="0"
        stroke="#76C045"
        strokeWidth="10"
      />

      <use xlinkHref="#long-read" x="60" y="100" />
      <use xlinkHref="#long-read" x="120" y="150" />
      <use xlinkHref="#long-read" x="100" y="200" />

      <g fill="#EF681F">
        <rect height="20" width="80" x="360" y="100" />

        <rect height="20" width="50" x="60" y="150" />
        <rect height="20" width="20" x="420" y="150" />


        <rect height="20" width="30" x="60" y="200" />
        <rect height="20" width="40" x="400" y="200" />
      </g>

      <rect
        height="190"
        width="380"
        x="60"
        y="60"
        fillOpacity="0"
        strokeWidth="10"
        stroke="white"
      />

      <g opacity="0.87" style={fontStyle}>
        <text x="450" y="30" textAnchor="end">Long reads</text>
      </g>
    </svg>
  );
}
