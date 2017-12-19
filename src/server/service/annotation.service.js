// @flow

import path from 'path';
import createLogger from 'debug';
import { rename } from 'fs';
import { Observable } from 'rxjs';
import progressObservable from './util/observable.util';
import { runScript } from './util/scriptUtil';

import type { Script, AnnotationPayload, Observable as ObservableType } from '../flowType/type';

const referenceGenomeName = 'Arabidopsis_thaliana';
const pathToSnpEff = process.env.SNP_EFF;
const logger = createLogger('dna:service:annotation');

export default function annotation(data: AnnotationPayload): ObservableType {
  if (!pathToSnpEff) {
    logger('\'SNP_EFF\' is not in set');
    return Observable.throw(new Error('Environment variable \'SNP_EFF\' is not set'));
  }
  const script = createScript(data);
  return progressObservable(0)
    .concat(runScript(script))
    .concat(progressObservable(95))
    .concat(renameGeneratedFiles(data)
      .map(info => Object({ info })))
    .concat(progressObservable(100));
}

function createScript(data: AnnotationPayload): Script {
  const command = 'java';
  const output = path.format({
    dir: data.outputDirectory,
    name: data.outputFilename,
    ext: '.txt',
  });

  const mandatoryParams = ['-Xmx4g', '-jar', pathToSnpEff, referenceGenomeName, data.inputFile];
  return {
    command, params: mandatoryParams, output, cwd: data.outputDirectory,
  };
}

function renameGeneratedFiles(data: AnnotationPayload): ObservableType {
  const generatedFilenames = [
    { name: 'snpEff_summary', ext: '.html' },
    { name: 'snpEff_genes', ext: '.txt' },
  ];

  const renameAsObservable = Observable.bindNodeCallback(rename);
  return Observable.merge(...generatedFilenames.map((filename) => {
    const { ext, name } = filename;
    const srcPath = path.format({ dir: data.outputDirectory, name, ext });
    const dstPath = path.format({ dir: data.outputDirectory, name: `${data.outputFilename}_${name}`, ext });
    return renameAsObservable(srcPath, dstPath);
  }));
}
