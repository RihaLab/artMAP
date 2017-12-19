import * as types from './filtration.actionType';

export function getFiltrationTools() {
  return { type: types.GET_FILTRATION_TOOLS };
}

export function getFiltrationToolsCompleted(tools) {
  return { type: types.GET_FILTRATION_TOOLS_COMPLETED, tools };
}

export function startFiltration(payload) {
  return { type: types.START_FILTRATION, payload };
}

export function filtrationSocketAction(payload) {
  if (payload.error) {
    return filtrationInProgress(`Error occurred: ${payload.error}`);
  }
  if (payload.info) {
    return filtrationInProgress(payload.info);
  }
  if (payload.result === 0) {
    return filtrationCompleted();
  }
  return filtrationFailed(`Finished with error code: ${payload.result}`);
}

export function cancelFiltration() {
  return { type: types.CANCEL_FILTRATION };
}

export function filtrationCompleted() {
  return { type: types.FILTRATION_COMPLETED };
}

export function filtrationInProgress(info) {
  return { type: types.FILTRATION_IN_PROGRESS, info };
}

export function filtrationFailed(message) {
  return { type: types.FILTRATION_FAILED, message };
}
