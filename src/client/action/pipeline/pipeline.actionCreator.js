import {
  CANCEL_PROCESSING,
  PROCESSING_FINISHED,
  PROCESSING_PROGRESS,
  PROCESSING_OPERATION_INFO,
  PROCESSING_OPERATION_RESULT,
  START_PROCESSING,
} from './pipeline.action';
import { GO_TO_NEXT_STEP, GO_TO_PREV_STEP } from '../wizard/wizard.action';
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

export const startProcessing = () => (dispatch, getState) => {
  const formData = getState().form.wizardDataInput.values;
  const options = getState().wizard.steps;
  const payload = Object.assign({}, formData, options);
  socket.emit(socketChannel.pipelineStart, payload);
  dispatch({ type: GO_TO_NEXT_STEP });
  dispatch({ type: START_PROCESSING });
};

export const cancelProcessing = () => (dispatch) => {
  socket.emit(socketChannel.cancelPipeline, null);
  dispatch({ type: CANCEL_PROCESSING });
  dispatch({ type: GO_TO_PREV_STEP });
};
