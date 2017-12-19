import { fromJS, Map } from 'immutable';
import * as types from '../action/bamSorting/bamSorting.actionType';
import { RESET_OPERATION_INFO } from '../action/general/general.actionType';
import { DONE, IN_PROGRESS, CANCELED, FAILED } from '../action/OperationStatusEnum';

export default function bamConversionReducer(state = new Map(), action) {
  const infoKey = 'operationInfo';
  switch (action.type) {
    case types.START_BAM_SORTING: {
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo: 'Operation started' }));
    }
    case types.BAM_SORTING_COMPLETED: {
      const operationInfo = `${state.get(infoKey)}\nSorting complete`;
      return state.merge(new Map({ operationStatus: DONE, operationInfo }));
    }
    case types.BAM_SORTING_FAILED: {
      const operationInfo = `${state.get(infoKey)}\n${action.message}`;
      return state.merge(new Map({ operationStatus: FAILED, operationInfo }));
    }
    case types.BAM_SORTING_IN_PROGRESS: {
      const operationInfo = `${state.get(infoKey)}\n${action.info}`;
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo }));
    }
    case types.CANCEL_BAM_SORTING: {
      const operationInfo = `${state.get(infoKey)}\nSorting canceled`;
      return state.merge(new Map({ operationStatus: CANCELED, operationInfo }));
    }
    case types.GET_BAM_SORTING_TOOLS_COMPLETED: {
      return state.merge(fromJS({ tools: action.tools }));
    }
    case RESET_OPERATION_INFO: {
      return state.delete('operationStatus').delete('operationInfo');
    }
    default:
      return state;
  }
}
