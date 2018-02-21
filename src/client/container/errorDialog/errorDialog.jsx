import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import { dismissError as dismissErrorAction } from '../../action';
import { Modal } from '../../component';

const errorDialog = ({ errorMessage, dismissError }) => {
  const actions = (
    <Button autoFocus color="primary" onClick={dismissError}>
      Ok
    </Button>
  );

  const content = (
    <div>
      <strong>Error:</strong>
      <p>{errorMessage}</p>
    </div>
  );

  return (
    <Modal
      title="Sorry. We encounter an unexpected error"
      isOpen={!!errorMessage}
      actions={actions}
      content={content}
    />
  );
};

errorDialog.propTypes = {
  dismissError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

errorDialog.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({ errorMessage: state.error.errorMessage });

export default connect(mapStateToProps, {
  dismissError: dismissErrorAction,
})(errorDialog);
