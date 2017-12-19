import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import socket from '../util/socket';
import * as types from '../action/bamConversion/bamConversion.actionType';
import * as actions from '../action/bamConversion/bamConversion.action';
import { channels } from '../../server/config';

function convert(action$) {
  return action$.ofType(types.START_BAM_CONVERSION)
    .map(action => action.payload)
    .flatMap((payload) => {
      socket.emit(channels.bamConversion, payload);
      return Observable.fromEvent(socket, channels.bamConversion)
        .map(actions.bamConversionSocketAction)
        .takeUntil(Observable.race(
          action$.ofType(types.CANCEL_BAM_CONVERSION),
          action$.ofType(types.BAM_CONVERSION_FAILED),
          action$.ofType(types.BAM_CONVERSION_COMPLETED),
        ));
    });
}

export default combineEpics(convert);
