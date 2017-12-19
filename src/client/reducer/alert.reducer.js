import { List } from 'immutable';
import { DISMISS_ALERT, CREATE_ALERT } from '../action/general/general.actionType';

export default function alignmentReducer(state = new List(), action) {
  switch (action.type) {
    case CREATE_ALERT: {
      return state.push(action.alert);
    }
    case DISMISS_ALERT: {
      return state.delete(action.alertIndex);
    }
    default:
      return state;
  }
}
