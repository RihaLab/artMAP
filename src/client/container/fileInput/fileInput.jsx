import React, { Component } from 'react';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import { InputAdornment, IconButton, Input, Tooltip } from 'material-ui';
import { Folder } from 'material-ui-icons';
import { FormControl } from '../../component';
import FileModal from './container/fileModal';

export default class FileInput extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = { isModalOpen: false };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal(file) {
    if (file) {
      this.props.input.onChange(file.path);
    }
    this.setState({ isModalOpen: false });
  }

  render() {
    const {
      input, dirSelect, label, meta: { touched, error },
    } = this.props;
    const { isModalOpen } = this.state;
    const adornment = (
      <InputAdornment>
        <Tooltip title="Select file">
          <IconButton onClick={this.openModal}>
            <Folder />
          </IconButton>
        </Tooltip>
      </InputAdornment>
    );

    return (
      <div>
        <FileModal
          onClose={this.closeModal}
          isOpen={isModalOpen}
          title={label}
          isDirSelect={dirSelect}
        />
        <FormControl error={error} label={label} isErrorShown={touched && !!error}>
          <Input
            value={input.value}
            inputProps={input}
            endAdornment={adornment}
          />
        </FormControl>
      </div>
    );
  }
}

FileInput.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  dirSelect: PropTypes.bool,
  label: PropTypes.string,
};

FileInput.defaultProps = {
  label: '',
  dirSelect: false,
};
