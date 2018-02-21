import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Avatar } from 'material-ui';
import { Folder as FolderIcon, InsertDriveFile as FileIcon } from 'material-ui-icons';
import { FileProps } from '../../../propTypes';
import { convertSize } from '../../../util';

export default function FileModalTableRow(props) {
  const { file, isActive } = props;
  const Icon = file.isDirectory ? FolderIcon : FileIcon;
  const fileSize = convertSize(file.size);

  return (
    <TableRow selected={isActive} onClick={props.onClick} onDoubleClick={props.onDoubleClick} >
      <TableCell>
        <Avatar>
          <Icon />
        </Avatar>
      </TableCell>
      <TableCell>{file.name}</TableCell>
      <TableCell>{fileSize}</TableCell>
      <TableCell>{file.path}</TableCell>
    </TableRow>
  );
}

FileModalTableRow.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  file: PropTypes.shape(FileProps).isRequired,
  isActive: PropTypes.bool,
};

FileModalTableRow.defaultProps = {
  isActive: false,
  onClick: null,
  onDoubleClick: null,
};
