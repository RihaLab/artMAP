import * as types from './snpCaller.actionType';

export function getSnpCallerTools() {
  return { type: types.GET_SNP_CALLER_TOOLS };
}

export function getSnpCallerToolsCompleted(tools) {
  return { type: types.GET_SNP_CALLER_TOOLS_COMPLETED, tools };
}

export function startSnpCaller(payload) {
  return { type: types.START_SNP_CALLER, payload };
}

export function snpCallerSocketAction(payload) {
  if (payload.error) {
    return snpCallerInProgress(`Error occurred: ${payload.error}`);
  }
  if (payload.info) {
    return snpCallerInProgress(payload.info);
  }
  if (payload.result === 0) {
    return snpCallerCompleted();
  }
  return snpCallerFailed(`Finished with error code: ${payload.result}`);
}

export function cancelSnpCaller() {
  return { type: types.CANCEL_SNP_CALLER };
}

export function snpCallerCompleted() {
  return { type: types.SNP_CALLER_COMPLETED };
}

export function snpCallerInProgress(info) {
  return { type: types.SNP_CALLER_IN_PROGRESS, info };
}

export function snpCallerFailed(message) {
  return { type: types.SNP_CALLER_FAILED, message };
}
