// @flow

import path from 'path';
import { Observable } from 'rxjs';
import { fromScript } from './util/scriptUtil';

import type { Script, BamConversionPayload, Observable as ObservableType } from '../flowType/type';

export default function conversion(data: BamConversionPayload): ObservableType {
  const script = createScript(data);
  return Observable.of({ progress: 0 })
    .concat(fromScript(script)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 100 }));
}

function createScript(data: BamConversionPayload): Script {
  const command = 'bamToFastq';
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  let params = ['-i', data.inputFile, '-fq', outputFile];
  if (data.pairEnd && data.secondNameOutputFilename) {
    const secondEndFile = path.join(data.outputDirectory, data.secondNameOutputFilename);
    params = params.concat(['-fq2', secondEndFile]);
  }
  return { command, params };
}
