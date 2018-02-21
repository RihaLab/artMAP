import { createReadStream } from 'fs';
import readline from 'readline';

export default async function visualization(path) {
  return new Promise((resolve) => {
    const graphMap = {};
    const graphs = [];

    const lineReader = readline.createInterface({
      input: createReadStream(path),
    });

    const processLine = (line) => {
      if (line[0] !== '#') {
        const parsedLine = parseLine(line);
        const { chromosome } = parsedLine;
        const graphIndex = graphMap[chromosome];
        if (typeof graphIndex === 'undefined') {
          graphMap[chromosome] = graphs.push({
            chromosome,
            data: [parsedLine],
          }) - 1;
        } else {
          graphs[graphIndex].data.push(parsedLine);
        }
      }
    };

    lineReader.on('line', processLine);

    lineReader.on('close', () => {
      resolve(graphs);
    });
  });
}

function parseLine(line) {
  const cols = line.split('\t');
  const result = {
    chromosome: cols[0],
    location: cols[1],
    frequency: calculateFrequency(cols[9]),
  };
  return Object.assign({}, result, parseDetails(cols[7]));
}

function parseDetails(line) {
  const cols = line.split('|');
  return {
    annotationImpact: cols[2],
    geneName: cols[3],
    featureType: cols[5],
    HGVSc: cols[9],
    HGVSp: cols[10],
    AAPositionLength: cols[13],
  };
}

function calculateFrequency(line) {
  const dp4string = line.split(':')[4];
  const dp4values = dp4string.split(',').map(Number);
  return (dp4values[2] + dp4values[3]) /
    (dp4values[0] + dp4values[1] + dp4values[2] + dp4values[3]);
}
