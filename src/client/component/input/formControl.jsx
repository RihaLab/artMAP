import React from 'react';
import PropTypes from 'prop-types';
import { FormControl as FormControlMui, InputLabel, FormHelperText } from 'material-ui';

export default function FormControl(props) {
  return (
    <FormControlMui fullWidth error={props.isErrorShown}>
      <InputLabel>{props.label}</InputLabel>
      {props.children}
      {props.isErrorShown && <FormHelperText>{props.error}</FormHelperText>}
    </FormControlMui>
  );
}

FormControl.propTypes = {
  error: PropTypes.string,
  isErrorShown: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FormControl.defaultProps = {
  error: '',
  isErrorShown: false,
};
