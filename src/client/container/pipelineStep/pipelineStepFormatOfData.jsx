import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToNextStep as goToNextStepAction } from '../../action';
import PipelineStepOption from './component/pipelineStepOption';
import PipelineStepOptionList from './component/pipelineStepOptionList';

function PipelineStepFormatOfData({ goToNextStep }) {
  const FirstOption = (
    <PipelineStepOption
      title="Single end"
      onSelect={() => goToNextStep({ pairEnd: false })}
      actionTitle="I have single end data"
    />
  );
  const SecondOption = (
    <PipelineStepOption
      title="Paired end"
      onSelect={() => goToNextStep({ pairEnd: true })}
      actionTitle="I have paired end data"
    />
  );

  return (
    <PipelineStepOptionList
      firstOption={FirstOption}
      secondOption={SecondOption}
    />
  );
}

PipelineStepFormatOfData.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default connect(null, {
  goToNextStep: goToNextStepAction,
})(PipelineStepFormatOfData);
