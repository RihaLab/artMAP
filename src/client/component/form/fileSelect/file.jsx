import React from 'react';
import PropTypes from 'prop-types';

export default function File(props) {
  return (
    <tr className={props.isActive ? 'active' : ''}>
      <td>
        <i className={props.isDirectory ? 'fa fa-folder' : 'fa fa-file-o'} />
      </td>
      <td>
        <strong>{props.name}</strong>
      </td>
      <td>
        {`${props.size}b`}
      </td>
      <td>
        {props.path}
      </td>
    </tr>
  );
}

File.propTypes = {
  isDirectory: PropTypes.bool.isRequired,
  name: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};
