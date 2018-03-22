import React from 'react';
import { CircularProgress } from 'material-ui';
import {
  Warning as IconError,
  Done as IconSuccess,
} from 'material-ui-icons';
import { PipelineOperationResultProps } from '../../../propTypes';
import { operationResult } from '../../../../../config';

export default function OperationResultIcon({ result }) {
  if (!result) {
    return <CircularProgress color="inherit" size={24} />;
  }
  if (result === operationResult.OK) {
    return <IconSuccess />;
  }
  return <IconError />;
}

OperationResultIcon.propTypes = {
  result: PipelineOperationResultProps,
};

OperationResultIcon.defaultProps = {
  result: null,
};
