import { fromJS, Map } from 'immutable';
import * as types from '../action/snpCaller/snpCaller.actionType';
import { RESET_OPERATION_INFO } from '../action/general/general.actionType';
import { DONE, IN_PROGRESS, CANCELED, FAILED } from '../action/OperationStatusEnum';

export default function snpCallerReducer(state = new Map(), action) {
  const infoKey = 'operationInfo';
  switch (action.type) {
    case types.START_SNP_CALLER: {
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo: 'Operation started' }));
    }
    case types.SNP_CALLER_COMPLETED: {
      const operationInfo = `${state.get(infoKey)}\nOperation complete`;
      return state.merge(new Map({ operationStatus: DONE, operationInfo }));
    }
    case types.SNP_CALLER_IN_PROGRESS: {
      const operationInfo = `${state.get(infoKey)}\n${action.info}`;
      return state.merge(new Map({ operationStatus: IN_PROGRESS, operationInfo }));
    }
    case types.CANCEL_SNP_CALLER: {
      const operationInfo = `${state.get(infoKey)}\nOperation canceled`;
      return state.merge(new Map({ operationStatus: CANCELED, operationInfo }));
    }
    case types.GET_SNP_CALLER_TOOLS_COMPLETED: {
      return state.merge(fromJS({ tools: action.tools }));
    }
    case types.SNP_CALLER_FAILED: {
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
