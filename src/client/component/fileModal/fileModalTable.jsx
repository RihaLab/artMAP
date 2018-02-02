/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableCell, TableRow } from 'material-ui';

import { fileSortFn } from '../../util';
import FileModalTableRow, { filePropType } from './fileModalTableRow';

const fileModalTable = (props) => {
  const renderRow = (row) => {
    const isActive = props.activeFile && props.activeFile.name === row.name;
    const markFile = isActive ? props.unmarkFile : props.markFile;
    return (
      <FileModalTableRow
        key={row.name}
        file={row}
        isActive={isActive}
        openDirectory={props.openDirectory}
        markFile={markFile}
      />
    );
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Size</TableCell>
          <TableCell>Path</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.fileStructure.sort(fileSortFn).map(renderRow)}
      </TableBody>

    </Table>
  );
};

fileModalTable.propTypes = {
  markFile: PropTypes.func.isRequired,
  unmarkFile: PropTypes.func.isRequired,
  fileStructure: PropTypes.arrayOf(filePropType).isRequired,
  openDirectory: PropTypes.func.isRequired,
  activeFile: filePropType,
};

fileModalTable.defaultProps = {
  activeFile: null,
};

export default fileModalTable;
