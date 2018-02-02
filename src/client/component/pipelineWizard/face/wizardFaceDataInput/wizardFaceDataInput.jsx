import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formPropTypes } from 'redux-form';
import { Card, CardContent, CardActions, Button, Typography, Grid } from 'material-ui';
import { DirInputFile, FileInputFile, TextField } from '../../../input/index';
import BackButton from '../../../backButton';
import Summary from './summary';
import AdvancedOptions from './advancedOptions';

const wizardFaceDataInput = ({ handleSubmit, valid, submitting }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Grid container spacing={40}>
      <Grid item xs={8}>
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
                component={FileInputFile}
              />
              <Field
                name="mutatedFile"
                type="text"
                label="Mutated file"
                component={FileInputFile}
              />
              <Field
                name="outputDirectory"
                type="text"
                label="Output directory"
                component={DirInputFile}
              />
              <Field
                name="outputFilename"
                type="text"
                label="Output filename"
                component={TextField}
              />
            </CardContent>
            <CardActions>
              <Button type="submit" disabled={!valid || submitting} raised color="primary">Submit</Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography align="center" type="display1" gutterBottom>Overview</Typography>
            <AdvancedOptions />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-end">
          <Grid item>
            <Summary />
          </Grid>
          <Grid item>
            <BackButton />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

wizardFaceDataInput.propTypes = PropTypes.shape(formPropTypes).isRequired;

const validate = (values) => {
  const fields = ['controlFile', 'mutatedFile', 'outputDirectory', 'outputFilename'];
  const errors = {};
  fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  form: 'wizardDataInput',
  validate,
  initialValues: {
    'skip-QC': true,
  },
})(wizardFaceDataInput);
