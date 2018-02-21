import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import steps from './wizardSteps';
import { goToNextStep, goToPrevStep, startProcessing } from '../../action';
import { Stepper } from '../../component';

function WizardContainer(props) {
  const Component = steps.find(s => s.order === props.currentStep).component;
  return (
    <Grid container justify="flex-end">
      <Grid item xs={12}>
        <Stepper steps={steps} currentStep={props.currentStep} />
      </Grid>
      <Grid item xs={12}>
        <Component />
      </Grid>
    </Grid>
  );
}

WizardContainer.propTypes = {
  currentStep: PropTypes.number.isRequired,
};


function mapStateToProps(state) {
  return { currentStep: state.wizard.currentStep };
}

export default connect(mapStateToProps, {
  goToNextStep,
  goToPrevStep,
  startProcessing,
})(WizardContainer);
