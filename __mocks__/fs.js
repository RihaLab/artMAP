'use strict';

const fs = jest.genMockFromModule('fs');

function rename(src, target, cb) {
  process.nextTick(() => cb(null, `FS MOCK: rename function: from ${src} to ${target}`));
}

fs.rename = rename;

module.exports = fs;