import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import socket from '../util/socket';

import * as types from '../action/pipeline/pipeline.actionType';
import * as actions from '../action/pipeline/pipeline.action';
import { channels } from '../../server/config';

function convert(action$) {
  return action$.ofType(types.START_PIPELINE)
    .map(action => action.payload)
    .flatMap((payload) => {
      socket.emit(channels.pipeline, payload);
      return Observable.fromEvent(socket, channels.pipeline)
        .map(actions.pipelineSocketAction)
        .takeUntil(Observable.race(
          action$.ofType(types.CANCEL_PIPELINE),
          action$.ofType(types.PIPELINE_FAILED),
          action$.ofType(types.PIPELINE_COMPLETED),
        ));
    });
}

export default combineEpics(convert);
