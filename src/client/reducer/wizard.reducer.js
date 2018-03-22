import { GO_TO_PREV_STEP, GO_TO_NEXT_STEP, GO_TO_STEP } from '../action/wizard/wizard.action';
import { CANCEL_PROCESSING } from '../action/pipeline/pipeline.action';

const defaultState = {
  currentStep: 0,
  filledSteps: 0,
  steps: {},
};

export default function wizardReducer(state = defaultState, action) {
  switch (action.type) {
    case GO_TO_NEXT_STEP: {
      const steps = action.result ? Object.assign({}, state.steps, action.result) : state.steps;
      const currentStep = state.currentStep + 1;
      const filledSteps = Math.max(state.filledSteps, currentStep);
      return { currentStep, steps, filledSteps };
    }
    case GO_TO_PREV_STEP: {
      return Object.assign({}, state, { currentStep: state.currentStep - 1 });
    }
    case GO_TO_STEP: {
      return Object.assign({}, state, { currentStep: action.step });
    }
    case CANCEL_PROCESSING: {
      return defaultState;
    }
    default:
      return state;
  }
}
