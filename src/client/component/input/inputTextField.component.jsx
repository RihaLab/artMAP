import PropTypes from 'prop-types';
import React from 'react';
import { FormControl, Input, InputLabel, FormHelperText } from 'material-ui';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';

const textField = ({ label, input, meta: { error, touched } }) => {
  const showError = touched && !!error;
  return (
    <FormControl error={showError}>
      <InputLabel>{label}</InputLabel>
      <Input {...input} />
      {showError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

textField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string,
};

textField.defaultProps = {
  label: '',
};

export default textField;

