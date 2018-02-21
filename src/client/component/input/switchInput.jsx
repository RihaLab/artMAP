import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'material-ui';
import { fieldInputPropTypes } from 'redux-form';

export default function SwitchInput({ input, label }) {
  return (
    <Switch
      checked={!!input.value}
      onChange={input.onChange}
      label={label}
    />
  );
}

SwitchInput.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.string,
};

SwitchInput.defaultProps = {
  label: '',
};
