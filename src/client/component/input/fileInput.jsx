import React from 'react';
import { FileInput as FileInputContainer } from '../../container';

export default function FileInput(props) {
  return (
    <FileInputContainer {...props} dirSelect={false} />
  );
}
