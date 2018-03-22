import PropTypes from 'prop-types';

const GraphDataProps = {
  chromosome: PropTypes.string.isRequired,
  location: PropTypes.number.isRequired,
  frequency: PropTypes.number.isRequired,
  annotationImpact: PropTypes.string,
  geneName: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  HGVSc: PropTypes.string.isRequired,
  HGVSp: PropTypes.string.isRequired,
  AAPositionLength: PropTypes.string.isRequired,
};

export default GraphDataProps;
