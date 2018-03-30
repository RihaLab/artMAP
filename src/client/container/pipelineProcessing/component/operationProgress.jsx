import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Tooltip, LinearProgress } from 'material-ui';
import OperationCancelButton from './operationCancelButton';

export default function OperationProgress({ progress }) {
  return (
    <Grid item xs={12}>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography align="center" type="display1" gutterBottom>
            {`In progress ${progress}%`}
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Tooltip title={`Operation in progress: ${progress}%`}>
            <LinearProgress mode="determinate" value={progress} />
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <OperationCancelButton />
        </Grid>
      </Grid>
    </Grid>
  );
}

OperationProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};
