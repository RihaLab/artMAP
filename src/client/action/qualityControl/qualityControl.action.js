import * as types from './qualityControl.actionType';

export function getQualityControlTools() {
  return { type: types.GET_QUALITY_CONTROL_TOOLS };
}

export function getQualityControlCompleted(tools) {
  return { type: types.GET_QUALITY_CONTROL_TOOLS_COMPLETED, tools };
}

export function startQualityControl(payload) {
  return { type: types.START_QUALITY_CONTROL, payload };
}

export function qualityControlSocketAction(payload) {
  if (payload.error) {
    return qualityControlInProgress(`Error occurred: ${payload.error}`);
  }
  if (payload.info) {
    return qualityControlInProgress(payload.info);
  }
  if (payload.result === 0) {
    return qualityControlCompleted();
  }
  return qualityControlFailed(`Finished with error code: ${payload.result}`);
}

export function cancelQualityControl() {
  return { type: types.CANCEL_QUALITY_CONTROL };
}

export function qualityControlCompleted() {
  return { type: types.QUALITY_CONTROL_COMPLETED };
}

export function qualityControlFailed(message) {
  return { type: types.QUALITY_CONTROL_FAILED, message };
}

export function qualityControlInProgress(info) {
  return { type: types.QUALITY_CONTROL_IN_PROGRESS, info };
}
