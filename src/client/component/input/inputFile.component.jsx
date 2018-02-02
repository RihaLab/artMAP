import React, { Component } from 'react';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  Tooltip,
  FormHelperText,
} from 'material-ui';
import { Folder } from 'material-ui-icons';
import { FileSelectModal, DirSelectModal } from '../fileModal';

export default class InputSelect extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = { isModalOpen: false };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { input, dirSelect, label, meta: { touched, error } } = this.props;
    const Modal = dirSelect ? DirSelectModal : FileSelectModal;
    const showError = touched && !!error;
    const { isModalOpen } = this.state;
    return (
      <div>
        <Modal selectFile={input.onChange} closeModal={this.closeModal} isOpen={isModalOpen} />
        <FormControl fullWidth error={showError}>
          <InputLabel>{label}</InputLabel>
          <Input
            value={input.value}
            inputProps={input}
            endAdornment={
              <InputAdornment>
                <Tooltip title="Open folder">
                  <IconButton onClick={this.openModal}>
                    <Folder />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
          {showError && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      </div>
    );
  }
}

InputSelect.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  dirSelect: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

InputSelect.defaultProps = {
  label: '',
};
