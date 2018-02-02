import path from 'path';
import createLogger from 'debug';
import { Observable } from 'rxjs/Rx';
import { fromScript } from '../util';
import filename from './pipelineOutputFilename';

const SNP_FILTRATION_SCRIPT = path.join(__dirname, '../../../scripts/snpsPicker.js');
const log = createLogger('dna:service:snpFiltration');

export const snpFiltrationControlFile = (data) => {
  const modification = {
    inputFile: path.join(data.outputDirectory, filename.snpCaller.controlFileOutput),
    outputFilename: filename.snpFiltration.controlFileOutput,
  };
  const payload = Object.assign({}, data, modification);

  return snpFiltration(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'SNP Filtration - control file' })))
    .map(info => Object.assign(info, { operation: 'SNP Filtration - control file' }))
    .catch(err => Object.assign(err, { operation: 'SNP Filtration - control file' }));
};

export const snpFiltrationMutatedFile = (data) => {
  const modification = {
    inputFile: path.join(data.outputDirectory, filename.snpCaller.mutatedFileOutput),
    outputFilename: filename.snpFiltration.mutatedFileOutput,
  };
  const payload = Object.assign({}, data, modification);

  return snpFiltration(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'SNP Filtration - mutated file' })))
    .map(info => Object.assign(info, { operation: 'SNP Filtration - mutated file' }))
    .catch(err => Object.assign(err, { operation: 'SNP Filtration - mutated file' }));
};

function snpFiltration(data) {
  const output = path.join(data.outputDirectory, data.outputFilename);
  const mandatoryParams = ['-i', data.inputFile, '-o', output];
  const script = { command: SNP_FILTRATION_SCRIPT, params: mandatoryParams };

  return fromScript(script)
    .do(payload => log(payload.info));
}
