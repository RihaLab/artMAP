// @flow

import path from 'path';
import { createReadStream } from 'fs';
import readline from 'readline';
import { Observable } from 'rxjs';

import type { Observable as ObservableType, PipelinePayload } from '../flowType/type';

export default function visualization(data: PipelinePayload): ObservableType {
  return Observable.create((observer) => {
    let graphs;

    const lineReader = readline.createInterface({
      input: createReadStream(path.format({ dir: data.outputDirectory, name: data.outputFilename, ext: '.txt' })),
    });
    // todo refactor
    // eslint-disable-next-line no-return-assign
    lineReader.on('line', line => graphs = parseLine(graphs, line));

    lineReader.on('close', () => {
      observer.next({ graphs });
      observer.complete();
    });
  });
}

const lineFormat = [
  'Allele', 'Annotation', 'Annotation Impact', 'Gene Name', 'Gene ID', 'Feature Type',
  'Feature ID', 'Transcript BioType', 'Rank', 'HGVS.c', 'HGVS.p', 'cDNA.pos / cDNA.length',
  'CDS.pos / CDS.length', 'AA.pos / AA.length', 'Distance', 'Info',
];

const fieldsOfInterest = [2, 3, 5, 9, 10, 13];

function parseLine(graphs = {}, line) {
  if (line.slice(0, 2) === '##' || !line.length) { // comment lines
    return graphs;
  }
  const fields = line.split('|');
  const result = {};
  result.chromosome = fields[0].substring(0, fields[0].indexOf('\t'));
  result.frequency = getFrequency(fields[fields.length - 1]);
  result.location = getLocation(fields[0]);
  // todo refactor
  // eslint-disable-next-line no-return-assign
  fieldsOfInterest.forEach(index => result[lineFormat[index]] = fields[index]);
  if (graphs[result.chromosome]) {
    graphs[result.chromosome].data.push(result);
  } else {
    // todo refactor
    // eslint-disable-next-line no-param-reassign
    graphs[result.chromosome] = { data: [result] };
  }
  return graphs;
}

function getFrequency(field) {
  const dp4chunks = field.slice(1).split('\t');
  const DP4Index = dp4chunks[0].split(':').indexOf('DP4');
  const DP4Values = dp4chunks[1].split(':')[DP4Index].split(',').map(e => Number(e));
  return (DP4Values[2] + DP4Values[3]) / (DP4Values[0] + DP4Values[1]);
}

function getLocation(field) {
  return field.split('\t')[1];
}
