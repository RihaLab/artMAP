import PropTypes from 'prop-types';
import { operationResult } from '../../../config';

const PipelineOperationResultProps = PropTypes.oneOf(Object.values(operationResult));

export default PipelineOperationResultProps;
