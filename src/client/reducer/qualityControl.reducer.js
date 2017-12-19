import { fromJS, Map } from 'immutable';
import * as types from '../action/qualityControl/qualityControl.actionType';
import { DONE, IN_PROGRESS, CANCELED, FAILED } from '../action/OperationStatusEnum';
import { RESET_OPERATION_INFO } from '../action/general/general.actionType';

export default function qualityControlReducer(state = new Map(), action) {
  const infoKey = 'operationInfo';
  switch (action.type) {
    case types.START_QUALITY_CONTROL: {
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo: 'Operation started' }));
    }
    case types.QUALITY_CONTROL_COMPLETED: {
      const operationInfo = `${state.get(infoKey)}\nConversion complete`;
      return state.merge(new Map({ operationStatus: DONE, operationInfo }));
    }
    case types.QUALITY_CONTROL_IN_PROGRESS: {
      const operationInfo = `${state.get(infoKey)}\n${action.info}`;
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo }));
    }
    case types.CANCEL_QUALITY_CONTROL: {
      const operationInfo = `${state.get(infoKey)}\nOperation canceled`;
      return state.merge(new Map({ operationStatus: CANCELED, operationInfo }));
    }
    case types.GET_QUALITY_CONTROL_TOOLS_COMPLETED: {
      return state.merge(fromJS({ tools: action.tools }));
    }
    case types.QUALITY_CONTROL_FAILED: {
      const operationInfo = `${state.get(infoKey)}\n${action.message}`;
      return state.merge(new Map({ operationStatus: FAILED, operationInfo }));
    }
    case RESET_OPERATION_INFO: {
      return state.delete('operationStatus').delete('operationInfo');
    }
    default:
      return state;
  }
}
