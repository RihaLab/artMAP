import { GO_TO_PREV_STEP, GO_TO_NEXT_STEP, RESTART_WIZARD } from '../action/wizard/wizard.action';

const defaultState = {
  currentStep: 0,
  steps: {},
};

export default function wizardReducer(state = defaultState, action) {
  switch (action.type) {
    case GO_TO_NEXT_STEP: {
      const steps = Object.assign({}, state.steps);
      Object.assign(steps, action.result);
      return { currentStep: state.currentStep + 1, steps };
    }
    case GO_TO_PREV_STEP: {
      return {
        currentStep: state.currentStep - 1,
        steps: state.steps,
      };
    }
    case RESTART_WIZARD: {
      return defaultState;
    }
    default:
      return state;
  }
}
