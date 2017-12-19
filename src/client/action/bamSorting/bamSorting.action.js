import * as types from './bamSorting.actionType';

export function startBamSorting(payload) {
  return { type: types.START_BAM_SORTING, payload };
}

export function cancelBamSorting() {
  return { type: types.CANCEL_BAM_SORTING };
}

export function bamSortingSocketAction(payload) {
  if (payload.error) {
    return bamSortingInProgress(`Error occurred: ${payload.error}`);
  }
  if (payload.info) {
    return bamSortingInProgress(payload.info);
  }
  if (payload.result === 0) {
    return bamSortingCompleted();
  }
  return bamSortingFailed(`Finished with error code: ${payload.result}`);
}

export function bamSortingCompleted() {
  return { type: types.BAM_SORTING_COMPLETED };
}

export function bamSortingFailed(message) {
  return { type: types.BAM_SORTING_FAILED, message };
}

export function bamSortingInProgress(info) {
  return { type: types.BAM_SORTING_IN_PROGRESS, info };
}

export function getBamSortingTools() {
  return { type: types.GET_BAM_SORTING_TOOLS };
}

export function getBamSortingToolsCompleted(tools) {
  return { type: types.GET_BAM_SORTING_TOOLS_COMPLETED, tools };
}
