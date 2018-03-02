import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from 'material-ui';
import GraphProps from '../../../propTypes/graph';
import { Resizer } from '../../../component';
import Graph from './graph';

export default function GraphList({ graphs }) {
  return (graphs.map(graph => (
    <Grid item xs={6} key={graph.chromosome}>
      <Typography align="center" type="headline" gutterBottom>
        {`Chromosome ${graph.chromosome}`}
      </Typography>
      <Resizer>
        <Graph {...graph} />
      </Resizer>
    </Grid>
  )));
}

GraphList.propTypes = {
  graphs: PropTypes.arrayOf(PropTypes.shape(GraphProps)),
};
