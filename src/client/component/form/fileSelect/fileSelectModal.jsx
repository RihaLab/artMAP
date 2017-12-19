import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalTable from './fileSelectModalTable';

export default class FileSelectModal extends Component {
  constructor(props) {
    super(props);
    this.setFileActive = this.setFileActive.bind(this);
    this.isSelectDisabled = this.isSelectDisabled.bind(this);
    this.state = { activeFile: null };
  }

  setFileActive(file) {
    this.setState({ activeFile: file });
  }

  isSelectDisabled() {
    const { activeFile } = this.state;
    const { isDirectorySelect } = this.props;
    if (!activeFile) {
      return true;
    } else if (activeFile.isDirectory && !isDirectorySelect) {
      return true;
    } else if (!activeFile.isDirectory && isDirectorySelect) {
      return true;
    }
    return false;
  }

  render() {
    const { isOpen, onClose, onSelect } = this.props;
    const { activeFile } = this.state;
    return (
      <Modal isOpen={isOpen}>
        <ModalTable
          setFileActive={this.setFileActive}
          activePath={activeFile ? activeFile.path : null}
        />
        <button type="button" disabled={this.isSelectDisabled} onClick={onClose}>Close</button>
        <button type="button" onClick={onSelect}>Select</button>
      </Modal>
    );
  }
}

FileSelectModal.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  isDirectorySelect: PropTypes.bool,
};

FileSelectModal.defaultProps = {
  isOpen: true,
  isDirectorySelect: false,
};
