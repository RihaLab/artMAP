import * as types from './fileSelect.actionType';

export function getFolderStructure(payload) {
  return { type: types.GET_FOLDER_STRUCTURE, payload };
}

export function getFolderStructureCompleted(payload) {
  return { type: types.GET_FOLDER_STRUCTURE_COMPLETED, payload };
}
