import socket from '../socket/socket.factory';
import { socket as socketChannel } from '../../../config';
import { processingFinished, processingOperationInfo, processingProgress, processingOperationResult } from '../action';

const socketMiddleware = ({ dispatch }) => {
  socket.on(socketChannel.pipelineResult, (payload) => {
    dispatch(processingFinished(payload));
  });

  socket.on(socketChannel.pipelineOperationInfo, (payload) => {
    dispatch(processingOperationInfo(payload));
  });

  socket.on(socketChannel.pipelineOperationResult, (payload) => {
    dispatch(processingOperationResult(payload));
  });

  socket.on(socketChannel.pipelineProgress, (payload) => {
    dispatch(processingProgress(payload));
  });

  return next => action => next(action);
};

export default socketMiddleware;
