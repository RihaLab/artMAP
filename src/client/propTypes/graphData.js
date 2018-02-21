import PropTypes from 'prop-types';

const GraphDataProps = {
  chromosome: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  frequency: PropTypes.number.isRequired,
  annotationImpact: PropTypes.string.isRequired,
  geneName: PropTypes.string.isRequired,
  featureType: PropTypes.string.isRequired,
  HGVSc: PropTypes.string.isRequired,
  HGVSp: PropTypes.string.isRequired,
  AAPositionLength: PropTypes.string.isRequired,
};

export default GraphDataProps;
