import React from 'react';

export default function FASTQFile() {
  return (
    <svg viewBox="0 0 500 300" width="100%">
      <rect height="210" width="400" x="50" y="50" className="svg-image" />
      <g className="svg-text" textAnchor="middle">
        <text x="250" y="90">TCACAGTCAAGATCTGGTGTAGATAC</text>
        <text x="250" y="120">TTATTCAATACGCGCTTGGCGGGAAG</text>
        <text x="250" y="150">GTTATCGCCCAGAACGGTGTCTCCGT</text>
        <text x="250" y="180">AAAACCCATATACTCCCTAAGAAATC</text>
        <text x="250" y="210">GAGTGACCGCCCCTAACAAACATACT</text>
        <text x="250" y="240">GAGAACCAGACTGCTAGGGTCGTGTC</text>

        <text x="450" y="30" className="svg-header">FASTQ</text>
      </g>
    </svg>
  );
}
