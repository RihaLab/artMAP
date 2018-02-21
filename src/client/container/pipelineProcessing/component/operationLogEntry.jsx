import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from 'material-ui';
import { LogProps } from '../../../propTypes';

export default function OperationLogEntry({ timestamp, info }) {
  return (
    <TableRow>
      <TableCell>{timestamp}</TableCell>
      <TableCell>{info}</TableCell>
    </TableRow>
  );
}

OperationLogEntry.propTypes = PropTypes.shape(LogProps).isRequired;
