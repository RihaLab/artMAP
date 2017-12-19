'use strict';

const tmp = jest.genMockFromModule('tmp');

let tempDirName = 'tmp-dir-name';

function dirSync() {
  return {
    name: tempDirName,
    removeCallback: jest.fn()
  };
}

function setDirName(name) {
  if (typeof name === 'string')
    tempDirName = name;
}

tmp.dirSync = dirSync;
tmp.__setDirName = setDirName;

module.exports = tmp;