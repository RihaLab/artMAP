/* eslint-disable max-len */
import path from 'path';
import tmp from 'tmp';
import createLogger from 'debug';
import { Observable } from 'rxjs';
import { fromScript } from '../util';
import filename from './pipelineOutputFilename';

const REFERENCE_GENOME = path.join(process.env.REFERENCE_GENOME_DIR, `${process.env.REFERENCE_GENOME}.fa`);
const log = createLogger('dna:service:alignment');

export const alignmentControlFile = (data) => {
  const modification = {
    outputFilename: filename.alignment.controlFileOutput,
  };
  if (!data.runQualityControl && data.skipBamConversion) {
    modification.inputFile = data.controlFile;
    modification.pairedInputFile = data.controlFileSE;
  } else if (!data.runQualityControl && !data.skipBamConversion) {
    modification.inputFile = path.join(data.outputDirectory, filename.bamConversion.controlFileOutput);
    modification.pairedInputFile = path.join(data.outputDirectory, filename.bamConversion.controlFileSEOutput);
  } else {
    modification.inputFile = path.join(data.outputDirectory, filename.qualityControl.controlFileOutput);
    modification.pairedInputFile = path.join(data.outputDirectory, filename.qualityControl.controlFileSEOutput);
  }

  const payload = Object.assign({}, data, modification);
  return alignment(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'Alignment - control file' })))
    .map(info => Object.assign(info, { operation: 'Alignment - control file' }))
    .catch(err => Object.assign(err, { operation: 'Alignment - control file' }));
};

export const alignmentMutatedFile = (data) => {
  const modification = {
    outputFilename: filename.alignment.mutatedFileOutput,
  };

  if (!data.runQualityControl && data.skipBamConversion) {
    modification.inputFile = data.mutatedFile;
    modification.pairedInputFile = data.mutatedFileSE;
  } else if (!data.runQualityControl && !data.skipBamConversion) {
    modification.inputFile = path.join(data.outputDirectory, filename.bamConversion.mutatedFileOutput);
    modification.pairedInputFile = path.join(data.outputDirectory, filename.bamConversion.mutatedFileSEOutput);
  } else {
    modification.inputFile = path.join(data.outputDirectory, filename.qualityControl.mutatedFileOutput);
    modification.pairedInputFile = path.join(data.outputDirectory, filename.qualityControl.mutatedFileSEOutput);
  }

  const payload = Object.assign({}, data, modification);
  return alignment(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'Alignment - mutated file' })))
    .map(info => Object.assign(info, { operation: 'Alignment - mutated file' }))
    .catch(err => Object.assign(err, { operation: 'Alignment - mutated file' }));
};

function alignment(data) {
  let result;
  if (data.pairEnd && data.pairedInputFile) {
    result = data.bigBP ? pairedEndBigBP(data) : pairedEndSmallBP(data);
  } else {
    result = data.bigBP ? singleEndBigBP(data) : singleEndSmallBP(data);
  }
  return result
    .do(payload => log(payload.info));
}

function singleEndSmallBP(data) {
  const tmpObj = tmp.dirSync({ unsafeCleanup: true, dir: data.outputDirectory });
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const alnTmpFile = path.join(tmpObj.name, 'alignment-tmp-file');
  const alnScript = createAlnScript(data.inputFile, alnTmpFile, data.alnParams);
  const samseScript = createSamseScript(data.inputFile, alnTmpFile, outputFile, data.samseParams);

  return fromScript(alnScript)
    .concat(fromScript(samseScript))
    .finally(tmpObj.removeCallback);
}

function singleEndBigBP(data) {
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const memScript = createMemScript(data.inputFile, outputFile);
  return fromScript(memScript);
}

function pairedEndSmallBP(data) {
  const { pairedInputFile, inputFile } = data;
  if (!pairedInputFile) {
    return Observable.throw('Missing paired input file');
  }
  const tmpObj = tmp.dirSync({ unsafeCleanup: true, dir: data.outputDirectory });
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const alnTmpFile = path.join(tmpObj.name, 'alignment-tmp');
  const alnTmpPairEndFile = path.join(tmpObj.name, 'alignment-tmp-pair-end');
  const alnScript1 = createAlnScript(data.inputFile, alnTmpFile, data.alnParams);
  const alnScript2 = createAlnScript(pairedInputFile, alnTmpPairEndFile, data.alnParams);
  const sampeScript = createSampeScript({
    inputFile,
    inputFilePairEnd: pairedInputFile,
    aln: alnTmpFile,
    alnPairEnd: alnTmpPairEndFile,
    output: outputFile,
  });

  return fromScript(alnScript1)
    .merge(fromScript(alnScript2))
    .concat(fromScript(sampeScript))
    .finally(tmpObj.removeCallback);
}

function pairedEndBigBP(data) {
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const memScript = createMemScript(data.inputFile, outputFile, data.pairedInputFile);
  return fromScript(memScript);
}

function createAlnScript(input, output) {
  const command = 'bwa';
  const scriptParams = ['aln'].concat(REFERENCE_GENOME, input);
  return { command, params: scriptParams, output };
}

function createMemScript(input, output, isSecondEnd) {
  const command = 'bwa';

  let scriptParams = ['mem'].concat(REFERENCE_GENOME, input);
  if (isSecondEnd) {
    scriptParams = scriptParams.concat(isSecondEnd);
  }
  return { command, params: scriptParams, output };
}

function createSamseScript(input, aln, output) {
  const command = 'bwa';
  const scriptParams = ['samse'].concat(REFERENCE_GENOME, aln, input);
  return { command, params: scriptParams, output };
}

// eslint-disable-next-line object-curly-newline
function createSampeScript({ inputFile, inputFilePairEnd, aln, alnPairEnd, output }) {
  const command = 'bwa';
  const scriptParams = ['sampe'].concat(REFERENCE_GENOME, aln, alnPairEnd, inputFile, inputFilePairEnd);
  return { command, params: scriptParams, output };
}
