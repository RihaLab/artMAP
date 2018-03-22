import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Tooltip, LinearProgress, IconButton } from 'material-ui';
import { Cancel as IconCancel } from 'material-ui-icons';

export default function OperationProgress({ progress, cancelProcessing }) {
  const CancelButton = () => (
    <Tooltip title="Cancel processing">
      <IconButton color="accent" aria-label="Cancel processing" onClick={cancelProcessing}>
        <IconCancel />
      </IconButton>
    </Tooltip>
  );

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
          <CancelButton />
        </Grid>
      </Grid>
    </Grid>
  );
}

OperationProgress.propTypes = {
  progress: PropTypes.number.isRequired,
  cancelProcessing: PropTypes.func.isRequired,
};
