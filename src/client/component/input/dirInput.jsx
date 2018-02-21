import React from 'react';
import { FileInput } from '../../container';

export default function DirInput(props) {
  return (
    <FileInput {...props} dirSelect />
  );
}
