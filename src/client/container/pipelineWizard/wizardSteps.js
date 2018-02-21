import {
  PipelineStepDataInput,
  PipelineStepFormatOfData,
  PipelineStepLengthOfReads,
  PipelineStepTypeOfData,
  PipelineProcessing,
  PipelineResultVisualization,
} from '..';

const steps = [
  { order: 0, title: 'Type of data', component: PipelineStepTypeOfData },
  { order: 1, title: 'Length of BP', component: PipelineStepLengthOfReads },
  { order: 2, title: 'Conversion to FastQ', component: PipelineStepFormatOfData },
  { order: 3, title: 'Input data', component: PipelineStepDataInput },
  { order: 4, title: 'Processing', component: PipelineProcessing },
  { order: 5, title: 'Visualization', component: PipelineResultVisualization },
];

export default steps;
