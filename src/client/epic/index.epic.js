import { combineEpics } from 'redux-observable';
import bamConversionEpics from './bamConversion.epic';
import alignmentEpics from './alignment.epic';
import pipelineEpics from './pipeline.epic';

const rootEpic = combineEpics(
  pipelineEpics,
  bamConversionEpics,
  alignmentEpics,
);

export default rootEpic;
