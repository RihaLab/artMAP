import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';
import { PipelineOperationProps } from '../../../propTypes';
import OperationLogEntry from './operationListEntry';

export default function OperationList({ operations }) {
  return (
    <Grid item xs={12}>
      {operations.map(operation => <OperationLogEntry key={operation.name} {...operation} />)}
    </Grid>
  );
}

OperationList.propTypes = {
  operations: PropTypes.arrayOf(PropTypes.shape(PipelineOperationProps)).isRequired,
};
