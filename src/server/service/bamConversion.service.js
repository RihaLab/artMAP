import path from 'path';
import createLogger from 'debug';
import { Observable } from 'rxjs/Rx';
import { fromScript } from '../util';
import filename from './pipelineOutputFilename';

const log = createLogger('dna:service:bamConversion');
const { empty, defer } = Observable;

const conversionTypes = {
  CONTROL_FILE: {
    inputFile: 'controlFile',
    outputFilename: filename.bamConversion.controlFileOutput,
    inputFileSE: 'controlFileSE',
    outputFilenameSE: filename.bamConversion.controlFileSEOutput,
    label: 'BAM Conversion - control file',
  },
  MUTATED_FILE: {
    inputFile: 'mutatedFile',
    outputFilename: filename.bamConversion.mutatedFileOutput,
    inputFileSE: 'mutatedFileSE',
    outputFilenameSE: filename.bamConversion.mutatedFileSEOutput,
    label: 'BAM Conversion - mutated file',
  },
};

export function bamConversionControlFile(data) {
  return conversion(data, conversionTypes.CONTROL_FILE);
}

export function bamConversionMutatedFile(data) {
  return conversion(data, conversionTypes.MUTATED_FILE);
}

function conversion(data, conversionType) {
  const {
    skipBamConversion, pairEnd, outputDirectory, controlFileSE, mutatedFileSE,
  } = data;
  if (skipBamConversion) {
    return empty();
  }

  const mapFn = payload => ({ ...payload, operation: conversionType.label });

  const scriptOptions = {
    inputFile: data[conversionType.inputFile],
    outputFilename: conversionType.outputFilename,
    outputFilenameSE: conversionType.outputFilenameSE,
    outputDirectory,
    pairEnd,
  };

  const run2Scripts = pairEnd && controlFileSE && mutatedFileSE;

  let observable;

  if (!run2Scripts) {
    const script = createScript(scriptOptions);
    observable = fromScript(script);
  } else {
    const scriptOptions1 = { ...scriptOptions, pairEnd: false };
    const scriptOptions2 = {
      ...scriptOptions,
      pairEnd: false,
      inputFile: data[conversionType.inputFileSE],
      outputFilename: conversionType.outputFilenameSE,
    };

    const script1 = createScript(scriptOptions1);
    const script2 = createScript(scriptOptions2);

    observable = fromScript(script1)
      .merge(fromScript(script2));
  }

  return observable
    .concat(defer(() => data.emitResult({ code: 0, operation: conversionType.label })))
    .map(mapFn)
    .catch(mapFn)
    .do(({ info }) => log(info));
}

function createScript(data) {
  const command = 'bamToFastq';
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  let params = ['-i', data.inputFile, '-fq', outputFile];
  if (data.pairEnd) {
    const secondEndFile = path.join(data.outputDirectory, data.outputFilenameSE);
    params = params.concat(['-fq2', secondEndFile]);
  }
  return { command, params };
}
