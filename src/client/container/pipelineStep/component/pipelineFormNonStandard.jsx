import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formPropTypes } from 'redux-form';
import { Card, CardContent, Typography, Grid } from 'material-ui';
import { FileInput, DirInput, TextInput, SubmitButton } from '../../../component';
import { PipelineAdditionalSettingsButton } from '../..';

function PipelineFormNonStandard({ handleSubmit, valid, submitting }) {
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
            name="controlFileSE"
            type="text"
            label="Control file (second end)"
            component={FileInput}
          />
          <Field
            name="mutatedFile"
            type="text"
            label="Mutated file"
            component={FileInput}
          />
          <Field
            name="mutatedFileSE"
            type="text"
            label="Mutated file (second end)"
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
          <Grid container>
            <Grid item>
              <SubmitButton disabled={!valid || submitting} />
            </Grid>
            <Grid item>
              <PipelineAdditionalSettingsButton />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

PipelineFormNonStandard.propTypes = PropTypes.shape(formPropTypes).isRequired;

function validate(values) {
  const fields = ['controlFile', 'controlFileSE', 'mutatedFile', 'mutatedFileSE', 'outputDirectory', 'outputFilename'];
  const errors = {};
  fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}

export default reduxForm({
  form: 'wizardDataInput',
  validate,
})(PipelineFormNonStandard);
