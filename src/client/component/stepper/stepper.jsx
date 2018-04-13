import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper as StepperMui, StepButton, StepLabel } from 'material-ui';
import './style.css';

export default function Stepper(props) {
  const { currentStep, steps } = props;
  return (
    <StepperMui activeStep={currentStep}>
      {steps.map(renderStep)}
    </StepperMui>
  );

  function renderStep(step) {
    const classes = {
      accessible: 'icon-container--accessible',
      current: 'icon-container--current',
    };
    const isCompleted = step.order < props.filledSteps && step.order !== currentStep;
    const isDisabled = step.order > props.filledSteps;
    const stepLabelClass = {};
    if (step.order === currentStep) {
      stepLabelClass.iconContainer = classes.current;
    } else if (step.order === props.filledSteps) {
      stepLabelClass.iconContainer = classes.accessible;
    }
    return (
      <Step key={step.order}>
        <StepButton
          completed={isCompleted}
          onClick={() => props.onStepClick(step.order)}
          disabled={isDisabled}
        >
          <StepLabel classes={stepLabelClass}>
            {step.title}
          </StepLabel>
        </StepButton>
      </Step>
    );
  }
}

Stepper.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  currentStep: PropTypes.number.isRequired,
  filledSteps: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onStepClick: PropTypes.func,
};

Stepper.defaultProps = {
  onStepClick: null,
};
