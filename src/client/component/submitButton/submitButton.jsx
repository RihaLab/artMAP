import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

export default function SubmitButton({ disabled }) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      raised
      color="primary"
    >
      Submit
    </Button>
  );
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  disabled: false,
};

