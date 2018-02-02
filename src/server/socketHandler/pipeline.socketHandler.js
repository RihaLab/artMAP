import createLogger from 'debug';
import { join as joinPaths } from 'path';
import { socket as socketChannel, operationResult } from '../../../config';
import { pipeline } from '../service';

const log = createLogger('dna:pipeline');
let x;

export const startPipeline = (socket, payload) => {
  let currentProgress = 0;
  log('Received incoming request');
  const { operationResultObservable, operationInfoObservable } = pipeline(payload);
  operationResultObservable.subscribe((info) => {
    socket.emit(socketChannel.pipelineOperationResult, info);
    socket.emit(socketChannel.pipelineProgress, { progress: Math.min(currentProgress += 7, 100) });
  });

  x = operationInfoObservable.subscribe(
    info => socket.emit(socketChannel.pipelineOperationInfo, info),
    err => socket.emit('operation-info-err', err),
    () => socket.emit(
      socketChannel.pipelineResult,
      {
        result: operationResult.OK,
        file: `${joinPaths(payload.outputDirectory, payload.outputFilename)}.txt`,
      },
    ),
  );
};

export const stopPipeline = (socket) => {
  x.unsubscribe();
  x = null;
  socket.emit(socketChannel.pipelineResult, { result: operationResult.CANCELED });
};
