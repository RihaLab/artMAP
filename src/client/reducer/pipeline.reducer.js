import { Map, List } from 'immutable';
import * as types from '../action/pipeline/pipeline.actionType';
import { RESET_OPERATION_INFO } from '../action/general/general.actionType';
import { DONE, IN_PROGRESS, CANCELED, FAILED } from '../action/OperationStatusEnum';

const defaultState = new Map({
  operations: new List(),
  graphs: new Map(),
});

const OPERATION_STATE = 'operationState';

export default function bamConversionReducer(state = defaultState, action) {
  switch (action.type) {
    case types.START_PIPELINE: {
      return state.set(OPERATION_STATE, IN_PROGRESS);
    }
    case types.PIPELINE_COMPLETED: {
      return state.set(OPERATION_STATE, DONE);
    }
    case types.PIPELINE_FAILED: {
      return state.set(OPERATION_STATE, FAILED);
    }
    case types.PIPELINE_INFO: {
      const operationIndex = state.get('operations').findIndex(op => op.get('name') === action.operationName);
      if (operationIndex !== -1) {
        return state.updateIn(['operations', operationIndex, 'info'], info => info.push(action.operationInfo));
      }
      return state.update('operations', operations => operations.push(new Map({
        progress: 0,
        name: action.operationName,
        info: new List([action.operationInfo]),
      })));
    }
    case types.PIPELINE_IN_PROGRESS: {
      const operationIndex = state.get('operations').findIndex(op => op.get('name') === action.operationName);
      if (operationIndex !== -1) {
        return state.setIn(['operations', operationIndex, 'progress'], action.operationsProgress);
      }
      return state.update('operations', operations => operations.push(new Map({
        name: action.operationName,
        progress: action.operationProgress,
        info: new List(),
      })));
    }
    case types.PIPELINE_GRAPHS: {
      return state.set('graphs', new Map(action.graphs));
    }
    case types.CANCEL_PIPELINE: {
      return state.set(OPERATION_STATE, CANCELED);
    }
    case RESET_OPERATION_INFO: {
      return defaultState;
    }
    default:
      return state;
  }
}
