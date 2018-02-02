import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel } from 'material-ui';
import steps from './wizardSteps';

const wizardState = ({ currentStep }) => (
  <Stepper activeStep={currentStep}>
    {steps.map(({ order, title }) => (
      <Step key={order} completed={order < currentStep}>
        <StepLabel>{title}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

wizardState.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default wizardState;
