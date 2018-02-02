import React from 'react';
import FileModalContainer from './fileModal.component';

export const FileSelectModal = props => <FileModalContainer {...props} title="Select file" isDirSelect={false} />;
export const DirSelectModal = props => <FileModalContainer {...props} title="Select directory" isDirSelect />;
