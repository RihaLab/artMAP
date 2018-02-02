import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'material-ui';

const switchInput = ({ input, label }) => (
  <Switch
    checked={!!input.value}
    onChange={input.onChange}
    label={label}
  />
);

switchInput.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
};

switchInput.defaultProps = {
  label: '',
};

export default switchInput;
