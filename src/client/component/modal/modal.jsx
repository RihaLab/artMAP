import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, DialogActions } from 'material-ui';

export default function Modal(props) {
  return (
    <Dialog
      open={props.isOpen}
      onEnter={props.onOpen}
      onClose={props.onClose}
      maxWidth="md"
      disableBackdropClick
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        {props.content}
      </DialogContent>
      <DialogActions>
        {props.actions}
      </DialogActions>
    </Dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  content: PropTypes.node.isRequired,
  actions: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
  onOpen: null,
  onClose: null,
};
