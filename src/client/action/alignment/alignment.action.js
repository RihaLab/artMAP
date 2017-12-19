import * as types from './alignment.actionType';

export function getAlignmentTools() {
  return { type: types.GET_ALIGNMENT_TOOLS };
}

export function getAlignmentToolsCompleted(tools) {
  return { type: types.GET_ALIGNMENT_TOOLS_COMPLETED, tools };
}

export function startAlignment(payload) {
  return { type: types.START_ALIGNMENT, payload };
}

export function alignmentSocketAction(payload) {
  if (payload.error) {
    return alignmentInProgress(`Error occurred: ${payload.error}`);
  }
  if (payload.info) {
    return alignmentInProgress(payload.info);
  }
  if (payload.result === 0) {
    return alignmentCompleted();
  }
  return alignmentFailed(`Finished with error code: ${payload.result}`);
}

export function cancelAlignment() {
  return { type: types.CANCEL_ALIGNMENT };
}

export function alignmentCompleted() {
  return { type: types.ALIGNMENT_COMPLETED };
}

export function alignmentInProgress(info) {
  return { type: types.ALIGNMENT_IN_PROGRESS, info };
}

export function alignmentFailed(message) {
  return { type: types.ALIGNMENT_FAILED, message };
}
