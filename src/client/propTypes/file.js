import PropTypes from 'prop-types';

const FileProps = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default FileProps;
