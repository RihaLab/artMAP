// @flow

import path from 'path';
import { Observable } from 'rxjs';
import { fromScript } from './util/scriptUtil';

import type { Script, SubtractionPayload, Observable as ObservableType } from '../flowType/type';

export default function subtraction(data: SubtractionPayload): ObservableType {
  const script = createScript(data);
  return Observable.of({ progress: 0 })
    .concat(fromScript(script)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 100 }));
}

function createScript(data: SubtractionPayload): Script {
  const command = 'subtractBed';
  const output = path.join(data.outputDirectory, data.outputFilename);
  const mandatoryParams = ['-a', data.mutatedFile, '-b', data.controlFile];
  return { command, params: mandatoryParams, output };
}
