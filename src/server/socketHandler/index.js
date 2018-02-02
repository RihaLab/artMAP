import createLogger from 'debug';
import { socket as socketChannel } from '../../../config';
import { startPipeline, stopPipeline } from './pipeline.socketHandler';

const log = createLogger('dna:socketHandler');

export const socketHandler = (socket) => {
  log('Registering socket channels:', socketChannel.pipelineStart, socketChannel.cancelPipeline);
  socket.on(socketChannel.pipelineStart, payload => startPipeline(socket, payload));
  socket.on(socketChannel.cancelPipeline, () => stopPipeline(socket));
};

export default socketHandler;
