import {
  CANCEL_PROCESSING,
  PROCESSING_FINISHED,
  PROCESSING_PROGRESS,
  PROCESSING_OPERATION_INFO,
  PROCESSING_OPERATION_RESULT,
  START_PROCESSING,
} from './pipeline.action';
import { GO_TO_NEXT_STEP } from '../wizard/wizard.action';
import socket from '../../socket/socket.factory';
import { socket as socketChannel, operationResult } from '../../../../config';

export const processingFinished = ({ result, file }) => (dispatch) => {
  dispatch({ type: PROCESSING_FINISHED, result, file });
  if (result === operationResult.OK) {
    dispatch({ type: GO_TO_NEXT_STEP });
  }
};

export const processingProgress = ({ progress }) => ({
  type: PROCESSING_PROGRESS, progress,
});

export const processingOperationInfo = ({ operation, info, timestamp }) => ({
  type: PROCESSING_OPERATION_INFO, operation, info, timestamp,
});

export const processingOperationResult = ({ operation, result }) => ({
  type: PROCESSING_OPERATION_RESULT, result, operation,
});

export const startProcessing = data => (dispatch, getState) => {
  const options = getState().wizard.steps;
  const payload = Object.assign({}, data, options);
  socket.emit(socketChannel.pipelineStart, payload);
  dispatch({ type: GO_TO_NEXT_STEP });
  dispatch({ type: START_PROCESSING, payload });
};

export const cancelProcessing = () => {
  socket.emit(socketChannel.cancelPipeline, null);
  return { type: CANCEL_PROCESSING };
};
