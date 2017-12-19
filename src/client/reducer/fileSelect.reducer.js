import { fromJS, Map } from 'immutable';
import * as types from '../action/fileSelect/fileSelect.actionType';

export default function fileSelectReducer(state = new Map(), action) {
  switch (action.type) {
    case types.GET_FOLDER_STRUCTURE_COMPLETED: {
      return state.merge(fromJS(action.payload));
    }
    default:
      return state;
  }
}
