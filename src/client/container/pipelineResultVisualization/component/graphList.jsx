import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';
import GraphProps from '../../../propTypes/graph';
import { Resizer } from '../../../component';
import Graph from './graph';

export default function GraphList({ graphs }) {
  return (
    <Grid container justify="space-between">
      {graphs.map(graph => (
        <Grid item xs={12} lg={12} xl={6} key={graph.chromosome}>
          <Resizer>
            <Graph {...graph} />
          </Resizer>
        </Grid>
      ))}
    </Grid>
  );
}

GraphList.propTypes = {
  graphs: PropTypes.arrayOf(PropTypes.shape(GraphProps)),
};
