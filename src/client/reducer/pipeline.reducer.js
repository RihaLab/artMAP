import {
  PROCESSING_PROGRESS,
  PROCESSING_OPERATION_RESULT,
  PROCESSING_FINISHED,
  PROCESSING_OPERATION_INFO,
  START_PROCESSING,
  CANCEL_PROCESSING,
} from '../action/pipeline/pipeline.action';
import { IN_PROGRESS, NOT_STARTED } from '../action/pipeline/pipelineResultType';

const defaultState = {
  pipelineState: NOT_STARTED,
  operations: [],
  operationMap: {},
  progress: 0,
};

export default function wizardReducer(state = defaultState, action) {
  switch (action.type) {
    case START_PROCESSING: {
      return Object.assign({}, state, { pipelineState: IN_PROGRESS });
    }
    case PROCESSING_PROGRESS: {
      return Object.assign({}, state, { progress: action.progress });
    }
    case PROCESSING_OPERATION_RESULT: {
      const operations = state.operations.slice(0);
      const operationIndex = state.operationMap[action.operation];
      operations[operationIndex].result = action.result;
      return Object.assign({}, state, { operations });
    }
    case PROCESSING_OPERATION_INFO: {
      const operations = state.operations.slice(0);
      const operationMap = Object.assign({}, state.operationMap);

      const logEntry = { timestamp: action.timestamp, info: action.info };
      const operationIndex = operationMap[action.operation];
      if (typeof operationIndex === 'undefined') {
        const newOperation = { name: action.operation, log: [logEntry] };
        operationMap[action.operation] = operations.push(newOperation) - 1;
        return Object.assign({}, state, { operations }, { operationMap });
      }
      operations[operationIndex].log.push(logEntry);
      return Object.assign({}, state, { operations });
    }
    case PROCESSING_FINISHED: {
      return Object.assign({}, state, { result: action.result, file: action.file });
    }
    case CANCEL_PROCESSING: {
      return defaultState;
    }
    default:
      return state;
  }
}
