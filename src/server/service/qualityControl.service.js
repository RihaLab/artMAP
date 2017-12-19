// @flow

import path from 'path';
import { rename } from 'fs';
import { Observable } from 'rxjs';
import { fromScript } from './util/scriptUtil';

import type { Observable as ObservableType, QualityControlPayload, Script } from '../flowType/type';

export default function qualityControl(data: QualityControlPayload): ObservableType {
  const script = createScript(data);
  return Observable.of({ progress: 0 })
    .concat(fromScript(script)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 95 }))
    .concat(renameOutputFile(data)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 100 }));
}

function renameOutputFile(data: QualityControlPayload): ObservableType {
  const { name } = path.parse(data.inputFile);
  const sourcePath = path.format({ dir: data.outputDirectory, name: `${name}_trimmed`, ext: '.fq' });
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const renameAsObservable = Observable.bindNodeCallback(rename);
  return Observable.concat(
    Observable.of(`Renaming from ${sourcePath} to ${outputFile}`),
    renameAsObservable(sourcePath, outputFile),
  );
}

function createScript(data: QualityControlPayload): Script {
  const command = 'trim_galore';
  let params = [data.inputFile, '-o', data.outputDirectory, '--no_report_file'];
  if (data.pairEnd) {
    params = params.concat('--paired');
  }
  return { command, params };
}
