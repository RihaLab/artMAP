import { FILE_STRUCTURE_RESOLVED, MARK_FILE } from './fileSelect.action';
import { encodeGetParams } from '../../util';
import config from '../../../../config';

export function openDirectory(path) {
  return async (dispatch) => {
    const url = encodeGetParams(`http://localhsot:${config.port}/api/file?`, { path });
    const fileStructure = await fetch(url).then(response => response.json());
    dispatch(directoryStructureResolved(fileStructure));
  };
}

export function markFile(file) {
  return { type: MARK_FILE, file };
}

export function unmarkFile() {
  return { type: MARK_FILE, file: null };
}

function directoryStructureResolved(fileStructure) {
  return { type: FILE_STRUCTURE_RESOLVED, fileStructure };
}
