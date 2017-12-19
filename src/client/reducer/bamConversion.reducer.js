import { fromJS, Map } from 'immutable';
import * as types from '../action/bamConversion/bamConversion.actionType';
import { RESET_OPERATION_INFO } from '../action/general/general.actionType';
import { DONE, IN_PROGRESS, CANCELED, FAILED } from '../action/OperationStatusEnum';

export default function bamConversionReducer(state = new Map(), action) {
  const infoKey = 'operationInfo';
  switch (action.type) {
    case types.START_BAM_CONVERSION: {
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo: 'Operation started' }));
    }
    case types.BAM_CONVERSION_COMPLETED: {
      const operationInfo = `${state.get(infoKey)}\nConversion complete`;
      return state.merge(new Map({ operationStatus: DONE, operationInfo }));
    }
    case types.BAM_CONVERSION_FAILED: {
      const operationInfo = `${state.get(infoKey)}\n${action.message}`;
      return state.merge(new Map({ operationStatus: FAILED, operationInfo }));
    }
    case types.BAM_CONVERSION_IN_PROGRESS: {
      const operationInfo = `${state.get(infoKey)}\n${action.info}`;
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo }));
    }
    case types.CANCEL_BAM_CONVERSION: {
      const operationInfo = `${state.get(infoKey)}\nConversion canceled`;
      return state.merge(new Map({ operationStatus: CANCELED, operationInfo }));
    }
    case types.GET_BAM_CONVERSION_TOOLS_COMPLETED: {
      return state.merge(fromJS({ tools: action.tools }));
    }
    case RESET_OPERATION_INFO: {
      return state.delete('operationStatus').delete('operationInfo');
    }
    default:
      return state;
  }
}
