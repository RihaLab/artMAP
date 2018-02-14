import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultDataInput from './wizardFaceDataInput';
import SecondEndDataInput from './wizardFaceDataInputFastQ';

function WizardFaceDataInputContainer(props) {
  if (props.skipBamConversion && props.pairEnd) {
    return <SecondEndDataInput {...props} />;
  }
  return <DefaultDataInput {...props} />;
}

WizardFaceDataInputContainer.propTypes = {
  skipBamConversion: PropTypes.bool.isRequired,
  pairEnd: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state.wizard.steps;
}

export default connect(mapStateToProps, null)(WizardFaceDataInputContainer);
