import path from 'path';
import createLogger from 'debug';
import { Observable } from 'rxjs/Rx';
import { fromScript } from '../util';
import filename from './pipelineOutputFilename';

const log = createLogger('dna:service:subtraction');

const pipelineSubtraction = (data) => {
  const modification = {
    controlFile: path.join(data.outputDirectory, filename.snpFiltration.controlFileOutput),
    mutatedFile: path.join(data.outputDirectory, filename.snpFiltration.mutatedFileOutput),
    outputFilename: filename.subtraction.output,
  };
  const payload = Object.assign({}, data, modification);

  return subtraction(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'Subtraction' })))
    .map(info => Object.assign(info, { operation: 'Subtraction' }))
    .catch(err => Object.assign(err, { operation: 'Subtraction' }));
};

function subtraction(data) {
  const command = 'subtractBed';
  const output = path.join(data.outputDirectory, data.outputFilename);
  const mandatoryParams = ['-a', data.mutatedFile, '-b', data.controlFile];
  const script = { command, params: mandatoryParams, output };

  return fromScript(script)
    .do(payload => log(payload.info));
}

export default pipelineSubtraction;
