import React from 'react';

export default function BAMFile() {
  return (
    <svg viewBox="0 0 500 300" width="100%">
      <rect height="210" width="400" x="50" y="50" className="svg-image" />
      <g className="svg-text" textAnchor="middle">
        <text x="250" y="90">10111011100010100011010000111</text>
        <text x="250" y="120">00001011010101101011100010011</text>
        <text x="250" y="150">10101000111011110111101011111</text>
        <text x="250" y="180">00010100011110010010110010101</text>
        <text x="250" y="210">01000101100100100101100000100</text>
        <text x="250" y="240">00111100001100101001100010001</text>

        <text x="450" y="30" className="svg-header">BAM</text>
      </g>
    </svg>
  );
}
