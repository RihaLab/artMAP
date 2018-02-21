import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToNextStep as goToNextStepAction } from '../../action';
import PipelineStepOption from './component/pipelineStepOption';
import PipelineStepOptionList from './component/pipelineStepOptionList';

function PipelineStepTypeOfData({ goToNextStep }) {
  const FirstOption = (
    <PipelineStepOption
      title="Input files are in BAM format"
      onSelect={() => goToNextStep({ skipBamConversion: false })}
      actionTitle="I have data in BAM format"
    />
  );
  const SecondOption = (
    <PipelineStepOption
      title="I have data in FastQ format"
      onSelect={() => goToNextStep({ skipBamConversion: true })}
      actionTitle="I have data in FastQ format"
    />
  );

  return (
    <PipelineStepOptionList
      firstOption={FirstOption}
      secondOption={SecondOption}
    />
  );
}

PipelineStepTypeOfData.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default connect(null, {
  goToNextStep: goToNextStepAction,
})(PipelineStepTypeOfData);
