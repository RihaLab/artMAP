import * as types from './samConversion.actionType';

export function startSamConversion(payload) {
  return { type: types.START_SAM_CONVERSION, payload };
}

export function cancelSamConversion() {
  return { type: types.CANCEL_SAM_CONVERSION };
}

export function samConversionSocketAction(payload) {
  if (payload.error) {
    return samConversionInProgress(`Error occurred: ${payload.error}`);
  }
  if (payload.info) {
    return samConversionInProgress(payload.info);
  }
  if (payload.result === 0) {
    return samConversionCompleted();
  }
  return samConversionFailed(`Finished with error code: ${payload.result}`);
}

export function samConversionCompleted() {
  return { type: types.SAM_CONVERSION_COMPLETED };
}

export function samConversionFailed(message) {
  return { type: types.SAM_CONVERSION_FAILED, message };
}

export function samConversionInProgress(info) {
  return { type: types.SAM_CONVERSION_IN_PROGRESS, info };
}

export function getSamConversionTools() {
  return { type: types.GET_SAM_CONVERSION_TOOLS };
}

export function getSamConversionToolsCompleted(tools) {
  return { type: types.GET_SAM_CONVERSION_TOOLS_COMPLETED, tools };
}
