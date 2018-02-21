import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableCell, TableRow } from 'material-ui';
import { fileSortFn } from '../../../util';
import FileListEntry from './fileListEntry';
import { FileProps } from '../../../propTypes';

export default function FileModalTable(props) {
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
        {props.fileStructure.sort(fileSortFn).map(renderFile)}
      </TableBody>

    </Table>
  );

  function renderFile(file) {
    return (
      <FileListEntry
        key={file.name}
        file={file}
        isActive={props.activeFile === file}
        onClick={() => props.onItemClick(file)}
        onDoubleClick={() => props.onItemDblClick(file)}
      />
    );
  }
}

FileModalTable.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  onItemClick: PropTypes.func,
  onItemDblClick: PropTypes.func,
  fileStructure: PropTypes.arrayOf(PropTypes.shape(FileProps)).isRequired,
  activeFile: PropTypes.shape(FileProps),
};

FileModalTable.defaultProps = {
  onItemClick: null,
  onItemDblClick: null,
  activeFile: null,
};
