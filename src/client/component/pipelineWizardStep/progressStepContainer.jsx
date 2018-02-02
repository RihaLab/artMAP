import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress, Button, Tooltip } from 'material-ui';
import { connect } from 'react-redux';
import { goToNextStep } from '../../action/index';
import ProgressDetail from './progressDetail';
import ProgressDetailList from './progressDetailList';

class ProgressStepContainer extends Component {
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
    document.title = `Processing: ${nextProps.progressPercent}%`;
    if (nextProps.progressPercent === 100) {
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
      <Grid xs={12}>
        <LinearProgress mode="determinate" value={this.props.progressPercent} />
        {this.props.activeProcesses.map(activeProcess => (
          <Tooltip title={activeProcess.operationName}>
            <LinearProgress key={activeProcess.name} />
          </Tooltip>
        ))}
        <DetailsButton />
        {isDetailShowed && <ProgressDetailList {...this.props} />}
      </Grid>
    );
  }
}

ProgressStepContainer.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  progressPercent: PropTypes.number,
  activeProcesses: PropTypes.arrayOf(ProgressDetail.propTypes),
  processes: PropTypes.arrayOf(ProgressDetail.propTypes),
};

ProgressStepContainer.defaultProps = {
  progressPercent: 0,
  activeProcesses: [],
  processes: [],
};

const mapStateToProps = state => {

};

export default connect(mapStateToProps, {
  goToNextStep,
})(ProgressStepContainer);
