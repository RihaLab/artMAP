import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Tooltip } from 'material-ui';
import { Refresh as IconRefresh } from 'material-ui-icons';
import { connect } from 'react-redux';
import { getGraphData, restartWizard } from '../../action';
import Graph, { graphDataPropType } from './visualizationGraph';

class Visualization extends Component {
  componentDidMount() {
    this.props.getGraphData(this.props.path);
  }

  render() {
    return (
      <Grid container spacing={40}>
        <Grid item xs={12}>
          <Typography align="center" type="display1" gutterBottom>Visualization</Typography>
        </Grid>
        {Object.keys(this.props.graphs).map(graphName => (
          <Grid item xs={6} key={graphName}>
            <Typography align="center" type="headline" gutterBottom>Chromosome {graphName}</Typography>
            <Graph chromosome={graphName} data={this.props.graphs[graphName].data} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <Grid item>
              <Tooltip title="Restart whole process">
                <Button type="button" onClick={this.props.restartWizard} fab color="primary">
                  <IconRefresh />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Visualization.propTypes = {
  path: PropTypes.string.isRequired,
  getGraphData: PropTypes.func.isRequired,
  restartWizard: PropTypes.func.isRequired,
  graphs: PropTypes.objectOf(PropTypes.shape({
    data: PropTypes.arrayOf(graphDataPropType),
  })),
};

Visualization.defaultProps = {
  graphs: {},
};

const mapStateToProps = state => ({
  path: state.pipeline.file,
  graphs: state.visualization.graphs,
});

export default connect(mapStateToProps, {
  getGraphData,
  restartWizard,
})(Visualization);
