import PropTypes from 'prop-types';
import GraphDataProps from './graphData';

const GraphProps = {
  data: PropTypes.arrayOf(PropTypes.shape(GraphDataProps)).isRequired,
  chromosome: PropTypes.string.isRequired,
};

export default GraphProps;
