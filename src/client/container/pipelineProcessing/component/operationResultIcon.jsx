import React from 'react';
import {
  MoreHoriz as IconInProgress,
  Warning as IconError,
  Done as IconSuccess,
} from 'material-ui-icons';
import { PipelineOperationResultProps } from '../../../propTypes';
import { operationResult } from '../../../../../config';

export default function OperationResultIcon({ result }) {
  if (!result) {
    return <IconInProgress />;
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
