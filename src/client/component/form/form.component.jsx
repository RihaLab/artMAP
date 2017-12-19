import React from 'react';

import FileSelectComponent from './fileSelect/fileSelect';

export function FileSelect(props) {
  return (
    <FileSelectComponent isDirectorySelect={false} {...props} />
  );
}

export function DirectorySelect(props) {
  return (
    <FileSelectComponent isDirectorySelect {...props} />
  );
}
