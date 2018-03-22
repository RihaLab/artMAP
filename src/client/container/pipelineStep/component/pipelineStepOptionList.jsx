import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';

export default function PipelineStepOptionList({ firstOption, secondOption }) {
  return (
    <Grid container justify="space-around">
      <Grid item xs={5}>
        {firstOption}
      </Grid>
      <Grid item xs={5}>
        {secondOption}
      </Grid>
    </Grid>
  );
}

PipelineStepOptionList.propTypes = {
  firstOption: PropTypes.node.isRequired,
  secondOption: PropTypes.node.isRequired,
};
