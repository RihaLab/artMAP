import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, withStyles } from 'material-ui';
import steps from './wizardSteps';
import BackButton from '../backButton/index';
import { goToNextStep, goToPrevStep, startProcessing } from '../../action';
import Stepper from './wizardState';

const WizardContainer = (props) => {
  const Component = steps.find(s => s.order === props.currentStep).component;
  return (
    <Grid container justify="flex-end">
      <Grid item xs={12}>
        <Stepper currentStep={props.currentStep} />
      </Grid>
      <Grid item xs={12}>
        <Component handleSubmit={props.startProcessing} {...props} />
      </Grid>
    </Grid>
  );
};

WizardContainer.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  currentStep: PropTypes.number,
  goToNextStep: PropTypes.func.isRequired,
  startProcessing: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

WizardContainer.defaultProps = {
  currentStep: 0,
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const styledWizardContainer = withStyles(styles)(WizardContainer);

const mapStateToProps = state => Object({ currentStep: state.wizard.currentStep });

export default connect(mapStateToProps, {
  goToNextStep,
  goToPrevStep,
  startProcessing,
})(styledWizardContainer);
