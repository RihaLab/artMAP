import { SHOW_ERROR, DISMISS_ERROR } from '../action/error/error.action';

const defaultState = {};

export default function errorReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_ERROR: {
      return Object.assign({}, state, { errorMessage: action.errorMessage });
    }
    case DISMISS_ERROR: {
      return defaultState;
    }
    default:
      return state;
  }

}

