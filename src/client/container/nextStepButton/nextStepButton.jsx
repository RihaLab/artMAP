import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'material-ui';
import { ArrowForward as IconForward } from 'material-ui-icons';
import { goToNextStep } from '../../action';

function NextStepButton(props) {
  return (
    <Tooltip title="Forward">
      <Button
        type="button"
        onClick={() => props.onClick()}
        fab
        color="primary"
      >
        <IconForward />
      </Button>
    </Tooltip>
  );
}

NextStepButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default connect(null, {
  onClick: goToNextStep,
})(NextStepButton);
