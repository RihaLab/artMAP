import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';
import ProgressDetailLog from './progressDetailLog';

const progressDetail = ({ operationName, log }) => (
  <div>
    <Typography>{operationName}</Typography>
    {log.map(logDetail => <ProgressDetailLog {...logDetail} />)}
  </div>
);

progressDetail.propTypes = {
  operationName: PropTypes.string.isRequired,
  log: PropTypes.arrayOf(ProgressDetailLog.propTypes),
};

progressDetail.defaultProps = {
  log: [],
};

export default progressDetail;
