import path from 'path';
import { Observable } from 'rxjs/Rx';
import tmp from 'tmp';
import createLogger from 'debug';
import { fromScript } from '../util';
import filename from './pipelineOutputFilename';

const log = createLogger('dna:service:samConversion');

export const samConversionControlFile = (data) => {
  const modification = {
    inputFile: path.join(data.outputDirectory, filename.alignment.controlFileOutput),
    outputFilename: filename.samConversion.controlFileOutput,
  };
  const payload = Object.assign({}, data, modification);
  return samConversion(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'SAM Conversion - control file' })))
    .map(info => Object.assign(info, { operation: 'SAM Conversion - control file' }))
    .catch(err => Object.assign(err, { operation: 'SAM Conversion - control file' }));
};

export const samConversionMutatedFile = (data) => {
  const modification = {
    inputFile: path.join(data.outputDirectory, filename.alignment.mutatedFileOutput),
    outputFilename: filename.samConversion.mutatedFileOutput,
  };
  const payload = Object.assign({}, data, modification);
  return samConversion(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'SAM Conversion - mutated file' })))
    .map(info => Object.assign(info, { operation: 'SAM Conversion - mutated file' }))
    .catch(err => Object.assign(err, { operation: 'SAM Conversion - mutated file' }));

};


function samConversion(data) {
  const tmpObj = tmp.dirSync({ unsafeCleanup: true, dir: data.outputDirectory });
  const tmpViewFile = path.join(tmpObj.name, 'tmp-view.bam');
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const viewScript = createViewScript(data.inputFile, tmpViewFile);
  const sortScript = createSortScript(tmpViewFile, outputFile);
  const indexScript = createIndexScript(outputFile);

  return fromScript(viewScript)
    .concat(fromScript(sortScript))
    .concat(fromScript(indexScript))
    .do(payload => log(payload.info))
    .finally(tmpObj.removeCallback);
}

function createViewScript(input, output) {
  const command = 'samtools';
  const scriptParams = ['view'].concat('-bS', '-o', output, input);
  return { command, params: scriptParams };
}

function createSortScript(input, output) {
  const command = 'samtools';
  const scriptParams = ['sort'].concat('-o', output, input);
  return { command, params: scriptParams };
}

function createIndexScript(input) {
  const command = 'samtools';
  const scriptParams = ['index'].concat(input);
  return { command, params: scriptParams };
}
