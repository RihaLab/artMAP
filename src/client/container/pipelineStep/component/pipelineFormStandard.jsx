import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formPropTypes } from 'redux-form';
import { Card, CardContent, CardActions, Typography } from 'material-ui';
import { FileInput, DirInput, TextInput, SubmitButton } from '../../../component';

function PipelineFormStandard({ handleSubmit, valid, submitting }) {
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
        </CardContent>
        <CardActions>
          <SubmitButton disabled={!valid || submitting} />
        </CardActions>
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

export default reduxForm({
  form: 'wizardDataInput',
  validate,
})(PipelineFormStandard);
