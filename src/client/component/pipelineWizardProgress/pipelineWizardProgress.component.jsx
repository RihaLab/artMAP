import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress, Button } from 'material-ui';
import { connect } from 'react-redux';
import { goToNextStep } from '../../action/index';
// import ProgressDetail from './progressDetail';
// import ProgressDetailList from './progressDetailList';

class PipelineWizardProgress extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.state = {
      isDetailShowed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-undef
    document.title = `Processing: ${nextProps.progress}%`;
    if (nextProps.progress === 100) {
      nextProps.goToNextStep();
    }
  }

  showDetails() {
    this.setState({ isDetailShowed: true });
  }

  hideDetails() {
    this.setState({ isDetailShowed: false });
  }

  render() {
    const { isDetailShowed } = this.state;
    const DetailsButton = isDetailShowed ?
      <Button onClick={this.hideDetails}>Hide details</Button> :
      <Button onClick={this.showDetails}>Show details</Button>;

    return (
      <Grid container>
        <Grid item xs={12}>
          <LinearProgress mode="determinate" value={this.props.progress} />
          <DetailsButton />
        </Grid>
      </Grid>
    );
  }
}

PipelineWizardProgress.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  progress: PropTypes.number,
};

PipelineWizardProgress.defaultProps = {
  progress: 0,
};

const mapStateToProps = state => state.pipeline;

export default connect(mapStateToProps, {
  goToNextStep,
})(PipelineWizardProgress);
