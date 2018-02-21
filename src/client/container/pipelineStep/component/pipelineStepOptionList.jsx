import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';

export default function PipelineStepOptionList({ firstOption, secondOption, actions }) {
  return (
    <Grid container spacing={40}>
      <Grid item xs={6}>
        {firstOption}
      </Grid>
      <Grid item xs={6}>
        {secondOption}
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-end">
          <Grid item>
            {actions}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

PipelineStepOptionList.propTypes = {
  firstOption: PropTypes.node.isRequired,
  secondOption: PropTypes.node.isRequired,
  actions: PropTypes.node,
};

PipelineStepOptionList.defaultProps = {
  actions: null,
};
