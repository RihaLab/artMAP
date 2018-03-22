import React from 'react';
import { Grid } from 'material-ui';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import steps from './wizardSteps';
import { goToStep } from '../../action';
import { Stepper } from '../../component';
import Title from './component/pipelineWizardStepTitle';
import { BackButton, NextStepButton } from '..';

function WizardContainer(props) {
  const { currentStep, filledSteps } = props;
  const step = steps.find(s => s.order === currentStep);
  const WizardStep = step.component;

  return (
    <Grid container justify="flex-end">
      <Grid item xs={12}>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          filledSteps={filledSteps}
          onStepClick={props.goToStep}
        />
      </Grid>
      <Grid item xs={12}>
        <Title>{step.title}</Title>
        <WizardStep />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Grid item>
            {!!currentStep && <BackButton />}
          </Grid>
          <Grid item>
            {filledSteps !== currentStep && <NextStepButton />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

WizardContainer.propTypes = {
  currentStep: PropTypes.number.isRequired,
  filledSteps: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentStep: state.wizard.currentStep,
    filledSteps: state.wizard.filledSteps,
  };
}

export default connect(mapStateToProps, {
  goToStep,
})(WizardContainer);
