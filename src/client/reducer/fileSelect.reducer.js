import { FILE_STRUCTURE_RESOLVED, MARK_FILE } from '../action/fileSelect/fileSelect.action';

export default function fileSelectReducer(state = {}, action) {
  switch (action.type) {
    case FILE_STRUCTURE_RESOLVED: {
      return Object.assign({}, state, action.fileStructure);
    }
    case MARK_FILE: {
      return Object.assign({}, state, { activeFile: action.file });
    }
    default:
      return state;
  }
}
