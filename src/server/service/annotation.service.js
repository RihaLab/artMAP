import path from 'path';
import { Observable } from 'rxjs';
import createLogger from 'debug';
import { fromScript, renameAsObservable } from '../util';
import filename from './pipelineOutputFilename';

const { REFERENCE_GENOME } = process.env;
const log = createLogger('dna:service:annotation');

const pipelineAnnotation = (data) => {
  const modification = {
    inputFile: path.join(data.outputDirectory, filename.subtraction.output),
  };
  const payload = Object.assign({}, data, modification);
  return annotation(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'Annotation' })))
    .map(info => Object.assign(info, { operation: 'Annotation' }))
    .catch(err => Object.assign(err, { operation: 'Annotation' }));
};

function annotation(data) {
  const script = createScript(data);
  return fromScript(script)
    .concat(renameGeneratedFiles(data))
    .do(payload => log(payload.info));
}

function createScript(data) {
  const command = 'snpEff';
  const output = path.format({ dir: data.outputDirectory, name: data.outputFilename, ext: '.txt' });
  const params = [REFERENCE_GENOME, data.inputFile];
  return {
    command, params, output, cwd: data.outputDirectory,
  };
}

function renameGeneratedFiles(data) {
  const generatedFilenames = [
    { name: 'snpEff_summary', ext: '.html' },
    { name: 'snpEff_genes', ext: '.txt' },
  ];

  return Observable.merge(...generatedFilenames.map((generatedFilename) => {
    const { ext, name } = generatedFilename;
    const srcPath = path.format({ dir: data.outputDirectory, name, ext });
    const dstPath = path.format({ dir: data.outputDirectory, name: `${data.outputFilename}_${name}`, ext });
    return renameAsObservable(srcPath, dstPath);
  }));
}

export default pipelineAnnotation;
