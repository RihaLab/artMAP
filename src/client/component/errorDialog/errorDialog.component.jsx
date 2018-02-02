import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from 'material-ui';
import { dismissError } from '../../action';

const errorDialog = props => (
  <Dialog open={!!props.errorMessage}>
    <DialogTitle>An error occurred</DialogTitle>
    <DialogContent>{`We encounter an unexpected error: ${props.errorMessage}`}</DialogContent>
    <DialogActions>
      <Button autoFocus color="primary" onClick={props.dismissError}>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

errorDialog.propTypes = {
  dismissError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

errorDialog.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({ errorMessage: state.error.errorMessage });

export default connect(mapStateToProps, {
  dismissError,
})(errorDialog);
