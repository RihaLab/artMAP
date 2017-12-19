import * as types from './bamConversion.actionType';

export function startBamConversion(payload) {
  return { type: types.START_BAM_CONVERSION, payload };
}

export function cancelBamConversion() {
  return { type: types.CANCEL_BAM_CONVERSION };
}

export function bamConversionCompleted() {
  return { type: types.BAM_CONVERSION_COMPLETED };
}

export function bamConversionFailed(message) {
  return { type: types.BAM_CONVERSION_FAILED, message };
}

export function bamConversionSocketAction(payload) {
  if (payload.error) {
    return bamConversionInProgress(`Error occurred: ${payload.error}`);
  }
  if (payload.info) {
    return bamConversionInProgress(payload.info);
  }
  if (payload.result === 0) {
    return bamConversionCompleted();
  }
  return bamConversionFailed(`Finished with error code: ${payload.result}`);
}

export function bamConversionInProgress(info) {
  return { type: types.BAM_CONVERSION_IN_PROGRESS, info };
}

export function getBamConversionTools() {
  return { type: types.GET_BAM_CONVERSION_TOOLS };
}

export function getBamConversionToolsCompleted(tools) {
  return { type: types.GET_BAM_CONVERSION_TOOLS_COMPLETED, tools };
}
