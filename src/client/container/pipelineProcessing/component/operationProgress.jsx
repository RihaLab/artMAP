import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Tooltip, LinearProgress } from 'material-ui';

export default function OperationProgress({ progress }) {
  return (
    <Grid item xs={12}>
      <Typography align="center" type="display1" gutterBottom>
        {`Processing data ${progress}%`}
      </Typography>
      <Tooltip title={`Operation in progress: ${progress}%`}>
        <LinearProgress mode="determinate" value={progress} />
      </Tooltip>
    </Grid>
  );
}

OperationProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};
