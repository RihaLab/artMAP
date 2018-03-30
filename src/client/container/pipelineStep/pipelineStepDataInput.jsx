import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import { IN_PROGRESS } from '../../action/pipeline/pipelineResultType';
import PipelineFormStandard from './component/pipelineFormStandard';
import PipelineFormNonStandard from './component/pipelineFormNonStandard';
import { PipelineOptionsSummary } from '..';
import { startProcessing as startProcessingAction } from '../../action';

function PipelineStepDataInput(props) {
  const DataInputComponent = props.skipBamConversion && props.pairEnd ?
    PipelineFormNonStandard : PipelineFormStandard;
  const isFormDisabled = props.pipelineState === IN_PROGRESS;
  return (
    <Grid container spacing={40}>
      <Grid item xs={8}>
        <DataInputComponent handleSubmit={props.startProcessing} isDisabled={isFormDisabled} />
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
  pipelineState: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { pipelineState } = state.pipeline;
  return Object.assign({}, state.wizard.steps, { pipelineState });
}

export default connect(mapStateToProps, {
  startProcessing: startProcessingAction,
})(PipelineStepDataInput);
