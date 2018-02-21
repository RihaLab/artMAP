import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableRow, TableHead } from 'material-ui';
import { LogProps } from '../../../propTypes';
import OperationLogEntry from './operationLogEntry';

export default function OperationLogList({ log }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Log</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {log.map(logEntry => <OperationLogEntry key={`${logEntry.timestamp}-${logEntry.info}`} {...logEntry} />)}
      </TableBody>
    </Table>
  );
}

OperationLogList.propTypes = PropTypes.arrayOf(PropTypes.shape(LogProps)).isRequired;
