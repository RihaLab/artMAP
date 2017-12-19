// @flow

import path from 'path';
import { Observable } from 'rxjs';
import { fromScript } from './util/scriptUtil';

import type { Script, SnpFiltrationPayload, Observable as ObservableType } from '../flowType/type';

// todo rewrite with process env

const script = path.join(__dirname, '../../../scripts/snpsPicker.js');

export default function snpFiltration(data: SnpFiltrationPayload): ObservableType {
  const filtrationScript = createScript(data);
  return Observable.of({ progress: 0 })
    .concat(fromScript(filtrationScript)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 100 }));
}

function createScript(data: SnpFiltrationPayload): Script {
  const output = path.join(data.outputDirectory, data.outputFilename);
  const mandatoryParams = ['-i', data.inputFile, '-o', output];
  return { command: script, params: mandatoryParams };
}
