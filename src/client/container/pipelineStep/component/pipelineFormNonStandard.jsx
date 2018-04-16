import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formPropTypes } from 'redux-form';
import { Card, CardContent, Typography, Grid } from 'material-ui';
import { FileInput, DirInput, TextInput, SubmitButton } from '../../../component';
import { PipelineAdditionalSettingsButton } from '../..';
import FormActions from './pipelineFormActions';

function PipelineFormNonStandard(props) {
  const {
    handleSubmit, valid, submitting, isDisabled,
  } = props;

  return (
    <Card>
      <form onSubmit={handleSubmit}>
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

const reduxPipelineFormNonStandard = reduxForm({
  form: 'wizardDataInput',
  validate,
})(PipelineFormNonStandard);

function mapStateToProps(state) {
  return { initialValues: state.pipeline.options };
}

export default connect(mapStateToProps, {})(reduxPipelineFormNonStandard);
