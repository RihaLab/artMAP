import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formPropTypes } from 'redux-form';
import { Card, CardContent, Typography, Grid } from 'material-ui';
import { FileInput, DirInput, TextInput, SubmitButton } from '../../../component';
import { PipelineAdditionalSettingsButton } from '../..';
import FormActions from './pipelineFormActions';

function PipelineFormStandard(props) {
  const {
    handleSubmit, valid, submitting, isDisabled,
  } = props;


  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardContent>
          <Typography align="center" type="display1" gutterBottom>
            Input data
          </Typography>
          <Field
            name="controlFile"
            type="text"
            label="Control file"
            component={FileInput}
          />
          <Field
            name="mutatedFile"
            type="text"
            label="Mutated file"
            component={FileInput}
          />
          <Field
            name="outputDirectory"
            type="text"
            label="Output directory"
            component={DirInput}
          />
          <Field
            name="outputFilename"
            type="text"
            label="Output filename"
            component={TextInput}
          />

          <FormActions container alignItems="center" justify="space-between">
            <Grid item>
              <SubmitButton disabled={!valid || submitting || isDisabled} />
            </Grid>
            <Grid item>
              <PipelineAdditionalSettingsButton />
            </Grid>
          </FormActions>
        </CardContent>
      </form>
    </Card>
  );
}

PipelineFormStandard.propTypes = PropTypes.shape(formPropTypes).isRequired;

function validate(values) {
  const fields = ['controlFile', 'mutatedFile', 'outputDirectory', 'outputFilename'];
  const errors = {};
  fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}

const reduxPipelineFormStandard = reduxForm({
  form: 'wizardDataInput',
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
})(PipelineFormStandard);

function mapStateToProps(state) {
  if (!state.form.wizardDataInput) {
    return Object();
  }
  return Object();
  // return { initialValues: state.form.wizardDataInput.values };
}

export default connect(mapStateToProps, {})(reduxPipelineFormStandard);
