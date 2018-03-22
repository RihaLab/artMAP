import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import PipelineFormStandard from './component/pipelineFormStandard';
import PipelineFormNonStandard from './component/pipelineFormNonStandard';
import { PipelineOptionsSummary, BackButton, PipelineAdditionalSettingsButton } from '..';
import { startProcessing as startProcessingAction } from '../../action';

function PipelineStepDataInput({ skipBamConversion, pairEnd, startProcessing }) {
  const DataInputComponent = skipBamConversion && pairEnd ?
    PipelineFormNonStandard : PipelineFormStandard;
  return (
    <Grid container spacing={40}>
      <Grid item xs={8}>
        <DataInputComponent handleSubmit={startProcessing} />
      </Grid>
      <Grid item xs={4}>
        <PipelineOptionsSummary />
      </Grid>
    </Grid>
  );
}

PipelineStepDataInput.propTypes = {
  skipBamConversion: PropTypes.bool.isRequired,
  pairEnd: PropTypes.bool.isRequired,
  startProcessing: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state.wizard.steps;
}

export default connect(mapStateToProps, {
  startProcessing: startProcessingAction,
})(PipelineStepDataInput);
