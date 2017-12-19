import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import socket from '../util/socket';

import * as types from '../action/alignment/alignment.actionType';
import * as actions from '../action/alignment/alignment.action';
import { channels } from '../../server/config';

function startAlignment(action$) {
  return action$.ofType(types.START_ALIGNMENT)
    .map(action => action.payload)
    .flatMap((payload) => {
      socket.emit(channels.alignment, payload);
      return Observable.fromEvent(socket, channels.alignment)
        .map(actions.alignmentSocketAction)
        .takeUntil(Observable.race(
          action$.ofType(types.CANCEL_ALIGNMENT),
          action$.ofType(types.ALIGNMENT_FAILED),
          action$.ofType(types.ALIGNMENT_COMPLETED),
        ));
    });
}

export default combineEpics(startAlignment);
