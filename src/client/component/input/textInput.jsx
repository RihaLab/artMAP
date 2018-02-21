import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'material-ui';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import FormControl from './formControl';

export default function TextField({ label, input, meta: { error, touched } }) {
  return (
    <FormControl label={label} isErrorShown={touched && !!error} error={error}>
      <Input {...input} />
    </FormControl>
  );
}

TextField.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  label: PropTypes.string,
};

TextField.defaultProps = {
  label: '',
};
