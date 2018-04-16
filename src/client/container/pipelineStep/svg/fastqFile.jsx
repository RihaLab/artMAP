import React from 'react';

export default function FASTQFile() {
  const fontStyle = {
    fontFamily: 'Roboto',
    fontSize: '22px',
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
      <g opacity="0.87" style={fontStyle} textAnchor="middle">
        <text x="250" y="90">TCACAGTCAAGATCTGGTGTAGATAC</text>
        <text x="250" y="120">TTATTCAATACGCGCTTGGCGGGAAG</text>
        <text x="250" y="150">GTTATCGCCCAGAACGGTGTCTCCGT</text>
        <text x="250" y="180">AAAACCCATATACTCCCTAAGAAATC</text>
        <text x="250" y="210">GAGTGACCGCCCCTAACAAACATACT</text>
        <text x="250" y="240">GAGAACCAGACTGCTAGGGTCGTGTC</text>

        <text x="450" y="30" textAnchor="end" style={{ fontSize: '28px' }}>FASTQ</text>
      </g>
    </svg>
  );
}
