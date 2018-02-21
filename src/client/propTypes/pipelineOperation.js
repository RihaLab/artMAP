import PropTypes from 'prop-types';
import LogProps from './log';
import PipelineOperationResultProps from './pipelineOperationResult';

const PipelineOperationProps = {
  name: PropTypes.string.isRequired,
  result: PipelineOperationResultProps,
  log: PropTypes.arrayOf(PropTypes.shape(LogProps)).isRequired,
};

export default PipelineOperationProps;
