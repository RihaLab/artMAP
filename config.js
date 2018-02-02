module.exports = {
  port: 3000,
  host: 'localhost',
  socket: {
    pipelineStart: 'pipeline-start',
    pipelineResult: 'pipeline-result',
    pipelineProgress: 'pipeline-progress',
    cancelPipeline: 'cancel-pipeline',

    pipelineOperationInfo: 'pipeline-operation-info',
    pipelineOperationResult: 'pipeline-operation-result',
  },
  operationResult: {
    OK: 'OK',
    ERROR: 'ERROR',
    CANCELED: 'CANCELED',
  },
};
