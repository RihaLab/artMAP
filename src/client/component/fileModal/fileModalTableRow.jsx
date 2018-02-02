import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Avatar } from 'material-ui';
import { Folder as FolderIcon, InsertDriveFile as FileIcon } from 'material-ui-icons';

import { convertSize } from '../../util';

// eslint-disable-next-line object-curly-newline
const fileModalTableRow = ({ file, isActive, markFile, openDirectory }) => {
  const Icon = file.isDirectory ? FolderIcon : FileIcon;
  const fileSize = convertSize(file.size);
  const onDblClick = file.isDirectory ? () => openDirectory(file.path) : null;

  return (
    <TableRow
      onClick={() => markFile(file)}
      onDoubleClick={onDblClick}
      selected={isActive}
    >
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
};

export const filePropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
});

fileModalTableRow.propTypes = {
  file: filePropType.isRequired,
  isActive: PropTypes.bool,
  markFile: PropTypes.func.isRequired,
  openDirectory: PropTypes.func.isRequired,
};

fileModalTableRow.defaultProps = {
  isActive: false,
};

export default fileModalTableRow;
