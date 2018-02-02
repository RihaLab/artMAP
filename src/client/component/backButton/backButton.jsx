import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'material-ui';
import { ArrowBack as IconBack } from 'material-ui-icons';

export default function backButton(props) {
  return (
    <Tooltip title="Back">
      <Button
        type="button"
        onClick={props.handleClick}
        fab
        color="primary"
      >
        <IconBack />
      </Button>
    </Tooltip>
  );
}

backButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

