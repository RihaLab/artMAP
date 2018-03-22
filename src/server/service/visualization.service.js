import { createReadStream } from 'fs';
import readline from 'readline';

export default async function visualization(path) {
  return new Promise((resolve) => {
    const chromosomes = {
      /* eslint-disable quote-props */
      '1': {
        chromosome: '1',
        chromosomeLength: 34964571,
        centromereLocation: 15086546,
        data: [],
      },
      '2': {
        chromosome: '2',
        chromosomeLength: 22037565,
        centromereLocation: 3608430,
        data: [],
      },
      '3': {
        chromosome: '3',
        chromosomeLength: 25499034,
        centromereLocation: 13588287,
        data: [],
      },
      '4': {
        chromosome: '4',
        chromosomeLength: 20862711,
        centromereLocation: 3956522,
        data: [],
      },
      '5': {
        chromosome: '5',
        chromosomeLength: 31270811,
        centromereLocation: 11725525,
        data: [],
      },
    };

    const lineReader = readline.createInterface({
      input: createReadStream(path),
    });

    const processLine = (line) => {
      if (line[0] !== '#') {
        const parsedLine = parseLine(line);
        const { chromosome } = parsedLine;
        const chromosomeEntry = chromosomes[chromosome];
        if (chromosomeEntry) {
          chromosomeEntry.data.push(parsedLine);
        }
      }
    };

    lineReader.on('line', processLine);

    lineReader.on('close', () => {
      resolve(Object.values(chromosomes));
    });
  });
}

function parseLine(line) {
  const cols = line.split('\t');
  const result = {
    chromosome: cols[0],
    location: Number(cols[1]),
    frequency: calculateFrequency(cols[9]),
    depth: getDepth(cols[9]),
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

function getDepth(line) {
  const value = line.split(':')[1];
  return Number(value);
}
