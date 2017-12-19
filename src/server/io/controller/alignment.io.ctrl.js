import createLogger from 'debug';
import alignment from '../../service/alignment.service';
import { channels } from '../../config';

const logger = createLogger('app:io:controller:Alignment');

export default function alignmentCtrl(data, socket) {
  logger('Received request: ', data);

  alignment(data).subscribe(
    info => infoHandler(info, socket),
    error => errHandler(error, socket),
    () => successHandler(socket),
  );
}

function infoHandler(info, socket) {
  logger('Sending info', info);
  socket.emit(channels.alignment, { info });
}

function errHandler(err, socket) {
  logger('Sending error', err);
  socket.emit(channels.alignment, err);
}

function successHandler(socket) {
  logger('Operation finished');
  socket.emit(channels.alignment, { result: 'done' });
}
