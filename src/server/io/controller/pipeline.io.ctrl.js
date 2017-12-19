import createLogger from 'debug';
import pipeline from '../../service/pipeline.service';
import { channels } from '../../config';

const logger = createLogger('app:io:controller:Pipeline');

export default function pipelineCtrl(data, socket) {
  logger('Received request: ', data);

  pipeline(data).subscribe(
    info => infoHandler(info, socket),
    error => errHandler(error, socket),
    () => successHandler(socket),
  );
}

function infoHandler(info, socket) {
  logger('Sending info', info);
  socket.emit(channels.pipeline, { info });
}

function errHandler(err, socket) {
  logger('Sending error', err);
  socket.emit(channels.pipeline, err);
}

function successHandler(socket) {
  logger('Operation finished');
  socket.emit(channels.pipeline, { result: 'done' });
}
