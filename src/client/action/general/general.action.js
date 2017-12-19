import * as types from './general.actionType';

export function resetOperationInfo() {
  return { type: types.RESET_OPERATION_INFO };
}

export function dismissAlert(alertIndex) {
  return { type: types.DISMISS_ALERT, alertIndex };
}
