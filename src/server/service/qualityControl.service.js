import path from 'path';
import { Observable } from 'rxjs';
import createLogger from 'debug';
import { fromScript, renameAsObservable } from '../util';
import filename from './pipelineOutputFilename';

const log = createLogger('dna:service:qualityControl');

export const qualityControlControlFile = (data) => {
  if (!data.runQualityControl) {
    return Observable.empty();
  }

  const modification = {
    inputFile: data.skipBamConversion ? data.controlFile :
      path.join(data.outputDirectory, filename.bamConversion.controlFileOutput),
    outputFilename: filename.qualityControl.controlFileOutput,
  };

  if (data.pairEnd) {
    modification.inputFileSE = data.skipBamConversion ? data.controlFileSE :
      path.join(data.outputDirectory, filename.bamConversion.controlFileSEOutput);
    modification.outputFilenameSE = filename.qualityControl.controlFileSEOutput;
  }

  const payload = Object.assign({}, data, modification);

  return qualityControl(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'Quality control - control file' })))
    .map(info => Object.assign(info, { operation: 'Quality control - control file' }))
    .catch(err => Object.assign(err, { operation: 'Quality control - control file' }));
};


export const qualityControlMutatedFile = (data) => {
  if (!data.runQualityControl) {
    return Observable.empty();
  }

  const modification = {
    inputFile: data.skipBamConversion ? data.mutatedFile :
      path.join(data.outputDirectory, filename.bamConversion.mutatedFileOutput),
    outputFilename: filename.qualityControl.mutatedFileOutput,
  };

  if (data.pairEnd) {
    modification.inputFileSE = data.skipBamConversion ? data.mutatedFileSE :
      path.join(data.outputDirectory, filename.bamConversion.mutatedFileSEOutput);
    modification.outputFilenameSE = filename.qualityControl.mutatedFileSEOutput;
  }

  const payload = Object.assign({}, data, modification);

  return qualityControl(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'Quality control - mutated file' })))
    .map(info => Object.assign(info, { operation: 'Quality control - mutated file' }))
    .catch(err => Object.assign(err, { operation: 'Quality control - mutated file' }));
};

function qualityControl(data) {
  const script = createScript(data);
  return fromScript(script)
    .concat(renameOutputFile(data))
    .do(payload => log(payload.info));
}

function renameOutputFile(data) {
  const { name } = path.parse(data.inputFile);

  if (data.pairEnd && data.inputFileSE) {
    const nameSE = path.parse(data.inputFileSE).name;
    const sourcePath = path.format({
      dir: data.outputDirectory,
      name: `${name}_val_1`,
      ext: '.fq',
    });
    const sourcePathSE = path.format({
      dir: data.outputDirectory,
      name: `${nameSE}_val_2`,
      ext: '.fq',
    });

    const outputFileSE = path.join(data.outputDirectory, data.outputFilenameSE);
    const outputFile = path.join(data.outputDirectory, data.outputFilename);

    return renameAsObservable(sourcePath, outputFile)
      .merge(renameAsObservable(sourcePathSE, outputFileSE));
  }
  const sourcePath = path.format({
    dir: data.outputDirectory,
    name: `${name}_trimmed`,
    ext: '.fq',
  });

  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  return renameAsObservable(sourcePath, outputFile);
}

function createScript(data) {
  const command = 'trim_galore';
  const params = ['-o', data.outputDirectory, '--no_report_file'];
  if (data.pairEnd && data.inputFileSE) {
    params.push('--paired', data.inputFile, data.inputFileSE);
  } else {
    params.push(data.inputFile);
  }
  return { command, params };
}
