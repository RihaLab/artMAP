import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Cancel as IconCancel } from 'material-ui-icons';
import { IconButton, Tooltip, Button, Typography } from 'material-ui';
import { Modal } from '../../../component';
import { cancelProcessing } from '../../../action';

class OperationCancelButton extends Component {
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

  closeModal(result) {
    this.setState({ isModalOpen: false });
    if (result) {
      this.props.cancelProcessing();
    }
  }

  render() {
    const modalActions = (
      <div>
        <Button onClick={() => this.closeModal()}>Cancel</Button>
        <Button color="primary" onClick={() => this.closeModal(true)}>Stop processing</Button>
      </div>
    );

    const modalContent = (
      <Typography type="body2">Do you really want to stop pipeline processing?</Typography>
    );

    return (
      <div>
        <Tooltip title="Cancel processing">
          <IconButton color="accent" aria-label="Cancel processing" onClick={this.openModal}>
            <IconCancel />
          </IconButton>
        </Tooltip>
        <Modal
          title="Cancel processing"
          isOpen={this.state.isModalOpen}
          content={modalContent}
          actions={modalActions}
        />
      </div>
    );
  }
}

OperationCancelButton.propTypes = {
  cancelProcessing: PropTypes.func.isRequired,
};

export default connect(null, {
  cancelProcessing,
})(OperationCancelButton);
