import { fromJS, Map } from 'immutable';
import * as types from '../action/samConversion/samConversion.actionType';
import { RESET_OPERATION_INFO } from '../action/general/general.actionType';
import { DONE, IN_PROGRESS, CANCELED, FAILED } from '../action/OperationStatusEnum';

export default function bamConversionReducer(state = new Map(), action) {
  const infoKey = 'operationInfo';
  switch (action.type) {
    case types.START_SAM_CONVERSION: {
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo: 'Operation started' }));
    }
    case types.SAM_CONVERSION_COMPLETED: {
      const operationInfo = `${state.get(infoKey)}\nConversion complete`;
      return state.merge(new Map({ operationStatus: DONE, operationInfo }));
    }
    case types.SAM_CONVERSION_FAILED: {
      const operationInfo = `${state.get(infoKey)}\n${action.message}`;
      return state.merge(new Map({ operationStatus: FAILED, operationInfo }));
    }
    case types.SAM_CONVERSION_IN_PROGRESS: {
      const operationInfo = `${state.get(infoKey)}\n${action.info}`;
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo }));
    }
    case types.CANCEL_SAM_CONVERSION: {
      const operationInfo = `${state.get(infoKey)}\nConversion canceled`;
      return state.merge(new Map({ operationStatus: CANCELED, operationInfo }));
    }
    case types.GET_SAM_CONVERSION_TOOLS_COMPLETED: {
      return state.merge(fromJS({ tools: action.tools }));
    }
    case RESET_OPERATION_INFO: {
      return state.delete('operationStatus').delete('operationInfo');
    }
    default:
      return state;
  }
}
