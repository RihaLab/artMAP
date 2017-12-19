// @flow

import path from 'path';
import tmp from 'tmp';
import { Observable } from 'rxjs';
import { fromScript } from './util/script.util';

import type { Script, SamConversionPayload, Observable as ObservableType } from '../flowType/type';

export default function conversion(data: SamConversionPayload): ObservableType {
  const tmpObj = tmp.dirSync({ unsafeCleanup: true, dir: data.outputDirectory });
  const tmpViewFile = path.join(tmpObj.name, 'tmp-view.bam');
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const viewScript = createViewScript(data.inputFile, tmpViewFile);
  const sortScript = createSortScript(tmpViewFile, outputFile);
  const indexScript = createIndexScript(outputFile);

  return Observable.of({ progress: 0 })
    .concat(fromScript(viewScript)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 33 }))
    .concat(fromScript(sortScript)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 67 }))
    .concat(fromScript(indexScript)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 100 }))
    .finally(tmpObj.removeCallback);
}

function createViewScript(input: string, output: string): Script {
  const command = 'samtools';
  const scriptParams = ['view'].concat('-bS', '-o', output, input);
  return { command, params: scriptParams };
}

function createSortScript(input: string, output: string): Script {
  const command = 'samtools';
  const scriptParams = ['sort'].concat('-o', output, input);
  return { command, params: scriptParams };
}

function createIndexScript(input: string): Script {
  const command = 'samtools';
  const scriptParams = ['index'].concat(input);
  return { command, params: scriptParams };
}
