import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './fileSelectModal';

class FileSelect extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isModalOpen: false,
    };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { input: { onChange } } = this.props;
    return (
      <div>
        <input {...this.props.input} />
        <button type="button" onClick={this.openModal}>Select</button>
        <Modal
          isOpen={this.state.isModalOpen}
          onSelect={onChange}
          onClose={this.closeModal}
        />
      </div>
    );
  }
}

FileSelect.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  isDirectorySelect: PropTypes.bool.isRequired,
};
