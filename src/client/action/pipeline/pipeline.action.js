import * as types from './pipeline.actionType';

export function startPipeline(payload) {
  return { type: types.START_PIPELINE, payload };
}

export function cancelPipeline() {
  return { type: types.CANCEL_PIPELINE };
}

export function pipelineCompleted() {
  return { type: types.PIPELINE_COMPLETED };
}

export function pipelineFailed(message) {
  return { type: types.PIPELINE_FAILED, message };
}

export function pipelineSocketAction(payload) {
  if (payload.result) {
    if (payload.result === 'done') {
      return pipelineCompleted();
    }
    return pipelineFailed(payload.message);
  }
  if (payload.graphs) {
    return pipelineGraphs(payload.graphs);
  }
  return pipelineInProgress(payload.info);
}

export function pipelineGraphs(graphs) {
  return { type: types.PIPELINE_GRAPHS, graphs };
}

export function pipelineInProgress(payload) {
  const result = { operationName: payload.name };
  if (payload.graphs) {
    return pipelineGraphs(payload.graphs);
  }
  if (!payload.info) {
    result.type = types.PIPELINE_IN_PROGRESS;
    result.operationsProgress = payload.progress;
  } else {
    result.type = types.PIPELINE_INFO;
    result.operationInfo = payload.info;
  }
  return result;
}
