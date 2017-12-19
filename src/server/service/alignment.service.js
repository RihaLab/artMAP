// @flow

import path from 'path';
import tmp from 'tmp';
import { Observable } from 'rxjs';
import { fromScript } from './util/script.util';

import type { AlignmentPayload, Observable as ObservableType, Script } from '../flowType/type';

// TODO rewrite with process.env
const referenceGenome = path.join(__dirname, '../..', 'data', 'genome.fa');

export default function alignment(data: AlignmentPayload): ObservableType {
  let result;
  if (data.pairEnd && data.pairedInputFile) {
    result = data.bigBP ? pairedEndBigBP(data) : pairedEndSmallBP(data);
  } else {
    result = data.bigBP ? singleEndBigBP(data) : singleEndSmallBP(data);
  }

  return Observable.of({ progress: 0 })
    .concat(result)
    .concat(Observable.of({ progress: 100 }));
}

function singleEndSmallBP(data: AlignmentPayload): ObservableType {
  const tmpObj = tmp.dirSync({ unsafeCleanup: true, dir: data.outputDirectory });
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const alnTmpFile = path.join(tmpObj.name, 'alignment-tmp-file');
  const alnScript = createAlnScript(data.inputFile, alnTmpFile);
  const samseScript = createSamseScript(data.inputFile, alnTmpFile, outputFile);

  return fromScript(alnScript)
    .map(info => Object({ info }))
    .concat(Observable.of({ progress: 50 }))
    .concat(fromScript(samseScript)
      .map(info => Object({ info })))
    .finally(tmpObj.removeCallback);
}

function singleEndBigBP(data: AlignmentPayload): ObservableType {
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const memScript = createMemScript(data.inputFile, outputFile);
  return fromScript(memScript).map(info => Object({ info }));
}

function pairedEndSmallBP(data: AlignmentPayload): ObservableType {
  const { pairedInputFile } = data;
  if (!pairedInputFile) {
    return Observable.throw('Missing paired input file');
  }
  const tmpObj = tmp.dirSync({ unsafeCleanup: true, dir: data.outputDirectory });
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const alnTmpFile = path.join(tmpObj.name, 'alignment-tmp');
  const alnTmpPairEndFile = path.join(tmpObj.name, 'alignment-tmp-pair-end');
  const alnScript1 = createAlnScript(data.inputFile, alnTmpFile);
  const alnScript2 = createAlnScript(pairedInputFile, alnTmpPairEndFile);
  // todo refactor
  // eslint-disable-next-line max-len
  const sampeScript = createSampeScript(data.inputFile, pairedInputFile, alnTmpFile, alnTmpPairEndFile, outputFile);

  return fromScript(alnScript1)
    .merge(fromScript(alnScript2))
    .map(info => Object({ info }))
    .concat(Observable.of({ progress: 67 }))
    .concat(fromScript(sampeScript)
      .map(info => Object({ info })))
    .finally(tmpObj.removeCallback);
}

function pairedEndBigBP(data: AlignmentPayload): ObservableType {
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const memScript = createMemScript(data.inputFile, outputFile, data.pairedInputFile);
  return fromScript(memScript).map(info => Object({ info }));
}

function createAlnScript(input: string, output: string): Script {
  const command = 'bwa';
  const scriptParams = ['aln'].concat(referenceGenome, input);
  return { command, params: scriptParams, output };
}

function createMemScript(input: string, output: string, secondEnd?: string): Script {
  const command = 'bwa';

  let scriptParams = ['mem'].concat(referenceGenome, input);
  if (secondEnd) {
    scriptParams = scriptParams.concat(secondEnd);
  }
  return { command, params: scriptParams, output };
}

function createSamseScript(input: string, alignmentStr: string, output: string): Script {
  const command = 'bwa';
  const scriptParams = ['samse'].concat(referenceGenome, alignmentStr, input);
  return { command, params: scriptParams, output };
}

// todo refactor
// eslint-disable-next-line max-len
function createSampeScript(inputFile: string, inputFilePairEnd: string, alignmentStr: string, alignmentPairEnd: string, output: string) {
  const command = 'bwa';
  const scriptParams = ['sampe'].concat(referenceGenome, alignmentStr, alignmentPairEnd, inputFile, inputFilePairEnd);
  return { command, params: scriptParams, output };
}
