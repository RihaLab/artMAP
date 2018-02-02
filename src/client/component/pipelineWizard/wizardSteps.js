import {
  WizardFaceTypeOfData,
  WizardFaceBPLength,
  WizardFaceSkipConversion,
  WizardFaceDataInput,
} from './face';

import { Visualization } from '../visualization';
import { OperationProgress } from '../operationProgress';

const steps = [
  { order: 0, title: 'Type of data', component: WizardFaceTypeOfData },
  { order: 1, title: 'Length of BP', component: WizardFaceBPLength },
  { order: 2, title: 'Conversion to FastQ', component: WizardFaceSkipConversion },
  { order: 3, title: 'Input data', component: WizardFaceDataInput },
  { order: 4, title: 'Processing', component: OperationProgress },
  { order: 5, title: 'Visualization', component: Visualization },
];

export default steps;
