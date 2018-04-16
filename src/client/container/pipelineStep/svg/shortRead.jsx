import React from 'react';

export default function ShortRead() {
  return (
    <svg viewBox="0 0 500 300" width="100%">
      <defs>
        <symbol id="short-read" className="svg-read">
          <rect height="20" width="70" x="0" y="0" />
          <rect height="20" width="70" x="80" y="0" />
          <rect height="20" width="70" x="160" y="0" />
          <rect height="20" width="70" x="240" y="0" />
        </symbol>
      </defs>

      <rect height="210" width="400" x="50" y="50" className="svg-image" />

      <use xlinkHref="#short-read" x="60" y="100" />
      <use xlinkHref="#short-read" x="120" y="150" />
      <use xlinkHref="#short-read" x="100" y="200" />

      <g className="svg-read">
        <rect height="20" width="60" x="380" y="100" />
        <rect height="20" width="50" x="60" y="150" />
        <rect height="20" width="30" x="60" y="200" />
        <rect height="20" width="20" x="420" y="200" />
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

      <text x="450" y="30" className="svg-header">Short reads</text>
    </svg>
  );
}
