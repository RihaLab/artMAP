import { Observable } from 'rxjs';

import {
  bamConversionControlFile,
  bamConversionMutatedFile,
  qualityControlControlFile,
  qualityControlMutatedFile,
  alignmentControlFile,
  alignmentMutatedFile,
  samConversionControlFile,
  samConversionMutatedFile,
  snpCallingControlFile,
  snpCallingMutatedFile,
  snpFiltrationControlFile,
  snpFiltrationMutatedFile,
  pipelineSubtraction,
  pipelineAnnotation,
} from '.';

import { operationResult } from '../../../config';

export default function pipeline(data) {
  let progressObserver;

  const emitResult = (result) => {
    progressObserver.next(Object.assign(result, { result: operationResult.OK }));
    return Observable.empty();
  };

  const operationResultObservable = Observable.create((obs) => {
    progressObserver = obs;
  });

  const payload = Object.assign({}, data, { emitResult });
  const operationInfoObservable = createControlFileStep(payload)
    .merge(createMutatedFileStep(payload))
    .concat(pipelineSubtraction(payload))
    .concat(pipelineAnnotation(payload))
    .map(e => Object.assign(e, { timestamp: new Date() }));

  return { operationInfoObservable, operationResultObservable };
}

function createControlFileStep(data) {
  return bamConversionControlFile(data)
    .concat(qualityControlControlFile(data))
    .concat(alignmentControlFile(data))
    .concat(samConversionControlFile(data))
    .concat(snpCallingControlFile(data))
    .concat(snpFiltrationControlFile(data));
}

function createMutatedFileStep(data) {
  return bamConversionMutatedFile(data)
    .concat(qualityControlMutatedFile(data))
    .concat(alignmentMutatedFile(data))
    .concat(samConversionMutatedFile(data))
    .concat(snpCallingMutatedFile(data))
    .concat(snpFiltrationMutatedFile(data));
}
