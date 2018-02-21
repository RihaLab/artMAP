import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper as StepperMui, StepLabel } from 'material-ui';

export default function Stepper({ currentStep, steps }) {
  return (
    <StepperMui activeStep={currentStep}>
      {steps.map(renderStep)}
    </StepperMui>
  );

  function renderStep(step) {
    return (
      <Step key={step.order} completed={step.order < currentStep}>
        <StepLabel>{step.title}</StepLabel>
      </Step>
    );
  }
}

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};
