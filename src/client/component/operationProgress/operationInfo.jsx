import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from 'material-ui';

const operationInfo = ({ log }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Timestamp</TableCell>
        <TableCell>Log</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        /* eslint-disable react/no-array-index-key */
        log.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>{entry.timestamp}</TableCell>
            <TableCell>{entry.info}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

operationInfo.propTypes = {
  log: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  })).isRequired,
};

export default operationInfo;
