import createLogger from 'debug';
import bamConversion from '../../service/bamConversion.service';
import { channels } from '../../config';

const logger = createLogger('app:io:controller:BAM Conversion');

export default function bamConversionCtrl(data, socket) {
  logger('Received request: ', data);

  bamConversion(data).subscribe(
    info => infoHandler(info, socket),
    error => errHandler(error, socket),
    () => successHandler(socket),
  );
}

function infoHandler(info, socket) {
  logger('Sending info', info);
  socket.emit(channels.bamConversion, { info });
}

function errHandler(err, socket) {
  logger('Sending error', err);
  socket.emit(channels.bamConversion, err);
}

function successHandler(socket) {
  logger('Operation finished');
  socket.emit(channels.bamConversion, { result: 'done' });
}
