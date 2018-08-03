import path from 'path';
import createLogger from 'debug';
import { Observable } from 'rxjs/Rx';
import { fromScript } from '../util';
import filename from './pipelineOutputFilename';

const log = createLogger('dna:service:bamConversion');

export const bamConversionControlFile = (data) => {
  if (data.skipBamConversion) {
    return Observable.empty();
  }

  const modification = {
    inputFile: data.controlFile,
    outputFilename: filename.bamConversion.controlFileOutput,
    secondNameOutputFilename: filename.bamConversion.controlFileSEOutput,
  };

  const payload = Object.assign({}, data, modification);

  if (data.controlFileSE && data.mutatedFileSE && data.pairEnd) {
    const pairedPayload = Object.assign({}, data, {
      inputFile: data.controlFileSE,
      outputFilename: filename.bamConversion.controlFileSEOutput,
    });

    return bamConversion(Object.assign({}, payload, { secondNameOutputFilename: null }))
      .merge(bamConversion(pairedPayload))
      .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'BAM Conversion - control file' })))
      .map(info => Object.assign(info, { operation: 'BAM Conversion - control file' }))
      .catch(err => Object.assign(err, { operation: 'BAM Conversion - control file' }));
  }
  return bamConversion(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'BAM Conversion - control file' })))
    .map(info => Object.assign(info, { operation: 'BAM Conversion - control file' }))
    .catch(err => Object.assign(err, { operation: 'BAM Conversion - control file' }));
};

export const bamConversionMutatedFile = (data) => {
  if (data.skipBamConversion) {
    return Observable.empty();
  }

  const modification = {
    inputFile: data.mutatedFile,
    outputFilename: filename.bamConversion.mutatedFileOutput,
    secondNameOutputFilename: filename.bamConversion.mutatedFileOutput,
  };

  const payload = Object.assign({}, data, modification);

  if (data.controlFileSE && data.mutatedFileSE && data.pairEnd) {
    const pairedPayload = Object.assign({}, data, {
      inputFile: data.mutatedFileSE,
      outputFilename: filename.bamConversion.mutatedFileSEOutput,
    });

    return bamConversion(Object.assign({}, payload, { secondNameOutputFilename: null }))
      .merge(bamConversion(pairedPayload))
      .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'BAM Conversion - control file' })))
      .map(info => Object.assign(info, { operation: 'BAM Conversion - control file' }))
      .catch(err => Object.assign(err, { operation: 'BAM Conversion - control file' }));
  }

  return bamConversion(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'BAM Conversion - mutated file' })))
    .map(info => Object.assign(info, { operation: 'BAM Conversion - mutated file' }))
    .catch(err => Object.assign(err, { operation: 'BAM Conversion - mutated file' }));
};

function bamConversion(data) {
  const script = createScript(data);
  return fromScript(script)
    .do(payload => log(payload.info));
}

function createScript(data) {
  const command = 'bamToFastq';
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  let params = ['-i', data.inputFile, '-fq', outputFile];
  if (data.pairEnd && data.secondNameOutputFilename) {
    const secondEndFile = path.join(data.outputDirectory, data.secondNameOutputFilename);
    params = params.concat(['-fq2', secondEndFile]);
  }
  return { command, params };
}
