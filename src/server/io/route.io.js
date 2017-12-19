import bamConversionCtrl from './controller/bamConversion.io.ctrl';
import pipelineCtrl from './controller/pipeline.io.ctrl';
import alignmentCtrl from './controller/alignment.io.ctrl';
import { channels } from '../config';

export default {
  bamConversion: {
    channel: channels.bamConversion,
    controller: bamConversionCtrl,
  },
  pipeline: {
    channel: channels.pipeline,
    controller: pipelineCtrl,
  },
  alignment: {
    channel: channels.alignment,
    controller: alignmentCtrl,
  },
};
