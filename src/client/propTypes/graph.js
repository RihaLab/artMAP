import PropTypes from 'prop-types';
import GraphDataProps from './graphData';

const GraphProps = {
  data: PropTypes.arrayOf(PropTypes.shape(GraphDataProps)).isRequired,
  chromosome: PropTypes.string.isRequired,
  centromereLocation: PropTypes.number.isRequired,
  chromosomeLength: PropTypes.number.isRequired,
};

export default GraphProps;
