import {
  PROCESSING_PROGRESS,
  PROCESSING_OPERATION_RESULT,
  PROCESSING_FINISHED,
  PROCESSING_OPERATION_INFO,
  START_PROCESSING,
  CANCEL_PROCESSING,
} from '../action/pipeline/pipeline.action';
import { IN_PROGRESS } from '../action/pipeline/pipelineResultType';

const defaultState = {
  operations: {},
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
      const operations = Object.assign({}, state.operations);
      operations[action.operation].result = action.result;
      return Object.assign({}, state, { operations });
    }
    case PROCESSING_OPERATION_INFO: {
      const operations = Object.assign({}, state.operations);
      const operationEntry = { timestamp: action.timestamp, info: action.info };

      if (!operations[action.operation]) {
        operations[action.operation] = {
          log: [operationEntry],
        };
      } else {
        operations[action.operation].log.push(operationEntry);
      }
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
