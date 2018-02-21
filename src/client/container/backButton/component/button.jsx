import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton, Tooltip } from 'material-ui';
import { ArrowBack as IconBack } from 'material-ui-icons';

export default function Button({ onClick }) {
  return (
    <Tooltip title="Back">
      <MuiButton
        type="button"
        onClick={onClick}
        fab
        color="primary"
      >
        <IconBack />
      </MuiButton>
    </Tooltip>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
