import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Tooltip } from 'material-ui';
import { Refresh as IconRefresh } from 'material-ui-icons';
import { connect } from 'react-redux';
import { getGraphData, restartWizard } from '../../action';
import GraphProps from '../../propTypes/graph';
import GraphList from './component/graphList';

class PipelineResultVisualization extends Component {
  componentDidMount() {
    this.props.getGraphData(this.props.path);
  }

  render() {
    return (
      <Grid container spacing={40}>
        <Grid item xs={12}>
          <Typography align="center" type="display1" gutterBottom>Visualization</Typography>
        </Grid>
        <Grid container spacing={40}>
          <GraphList graphs={this.props.graphs} />
        </Grid>
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

PipelineResultVisualization.propTypes = {
  path: PropTypes.string.isRequired,
  getGraphData: PropTypes.func.isRequired,
  restartWizard: PropTypes.func.isRequired,
  graphs: PropTypes.arrayOf(PropTypes.shape(GraphProps)),
};

PipelineResultVisualization.defaultProps = {
  graphs: [],
};

const mapStateToProps = state => ({
  path: state.pipeline.file,
  graphs: state.visualization.graphs,
});

export default connect(mapStateToProps, {
  getGraphData,
  restartWizard,
})(PipelineResultVisualization);
