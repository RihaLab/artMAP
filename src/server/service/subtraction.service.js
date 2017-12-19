// @flow

import path from 'path';
import { Observable } from 'rxjs';
import { runScript } from './util/script.util';

import type { Script, SubtractionPayload, Observable as ObservableType } from '../flowType/type';

const COMMAND = 'subtractBed';

export default function subtraction(data: SubtractionPayload): ObservableType {
  const script = createScript(data);
  return Observable.of({ progress: 0 })
    .concat(runScript(script))
    .concat(Observable.of({ progress: 100 }));
}

function createScript(data: SubtractionPayload): Script {
  const output = path.join(data.outputDirectory, data.outputFilename);
  const params = ['-a', data.mutatedFile, '-b', data.controlFile];
  return { command: COMMAND, params, output };
}
