import { GO_TO_NEXT_STEP, GO_TO_PREV_STEP, RESTART_WIZARD } from './wizard.action';

export function goToNextStep(result) {
  return { type: GO_TO_NEXT_STEP, result };
}

export function goToPrevStep() {
  return { type: GO_TO_PREV_STEP };
}

export function restartWizard() {
  return { type: RESTART_WIZARD };
}
