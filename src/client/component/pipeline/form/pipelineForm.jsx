/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formPropTypes, formValueSelector } from 'redux-form';
import { FileSelect, DirectorySelect } from '../../form/form.component';

function PipelineForm(props) {
  return (
    <form {...props}>
      <fieldset>
        <legend>Simple pipeline</legend>
        <div>
          <label htmlFor="controlFile">Control file</label>
          <Field component={FileSelect} name="controlFile" />
        </div>
        <div>
          <label htmlFor="mutantFile">Mutant file</label>
          <Field component={FileSelect} name="mutantFile" />
        </div>
        <div>
          <label htmlFor="pairEnd">
            <Field component="input" type="checkbox" name="pairEnd" />
            Pair end data
          </label>
        </div>
        {props.isPairEnd &&
          <div>
            <label htmlFor="controlFileSE">Second end Control file</label>
            <Field component={FileSelect} name="controlFileSE" />
          </div>
        }
        {props.isPairEnd &&
          <div>
            <label htmlFor="mutantFileSE">Second end Mutant file</label>
            <Field component={FileSelect} name="mutantFileSE" />
          </div>
        }
        <div>
          <label htmlFor="bigBP">
            <Field component="input" type="checkbox" name="bigBP" />
            BP over 80
          </label>
        </div>
        <div>
          <label htmlFor="outputDirectory">Output directory</label>
          <Field component={DirectorySelect} name="outputDirectory" />
        </div>
        <div>
          <label htmlFor="outputFilename">Output directory</label>
          <Field component="input" type="text" name="outputFilename" />
        </div>
      </fieldset>
    </form>
  );
}

PipelineForm.propTypes = formPropTypes;

const reduxPipelineForm = reduxForm({
  form: 'pipeline',
})(PipelineForm);

const selector = formValueSelector('pipeline');

function mapStateToProps(state) {
  return {
    isPairEnd: selector(state, 'pairEnd'),
  };
}

export default connect(mapStateToProps)(reduxPipelineForm);
