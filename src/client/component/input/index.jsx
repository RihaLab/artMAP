import React from 'react';
import InputFile from './inputFile.component';

export TextField from './inputTextField.component';
export SwitchInput from './inputSwitch.component';

export const FileInputFile = props => <InputFile {...props} dirSelect={false} />;
export const DirInputFile = props => <InputFile {...props} dirSelect />;
