import React from 'react';
import PropTypes from 'prop-types';
import {
  LinearProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  Tooltip,
} from 'material-ui';
import {
  ExpandMore as IconMore,
  MoreHoriz as IconInProgress,
  Warning as IconError,
  Done as IconSuccess,
} from 'material-ui-icons';
import { connect } from 'react-redux';
import BackButton from '../backButton';
import { cancelProcessing } from '../../action';
import { operationResult } from '../../../../config';
import OperationInfo from './operationInfo';

const operationProgress = ({ progress, operations, cancelProcessing }) => {
  const Icon = ({ result }) => {
    if (!result) {
      return <IconInProgress />;
    }
    if (result === operationResult.OK) {
      return <IconSuccess />;
    }
    return <IconError />;
  };

  return (
    <Grid container spacing={40}>
      <Grid item xs={12}>
        <Typography align="center" type="display1" gutterBottom>{`Processing data ${progress}%`}</Typography>
        <Tooltip title={`Operation in progress: ${progress}%`}>
          <LinearProgress mode="determinate" value={progress} />
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        {
          Object.keys(operations).map(operationName => (
            <ExpansionPanel key={operationName}>
              <ExpansionPanelSummary expandIcon={<IconMore />}>
                <Icon result={operations[operationName].result} />
                <Typography type="subheading">{operationName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <OperationInfo log={operations[operationName].log} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        }
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-end">
          <Grid item>
            <BackButton handleClick={cancelProcessing} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

operationProgress.propTypes = {
  cancelProcessing: PropTypes.func.isRequired,
  progress: PropTypes.number,
  operations: PropTypes.objectOf(PropTypes.shape({
    log: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
    })),
    result: PropTypes.string,
  })).isRequired,
};

operationProgress.defaultProps = {
  progress: 0,
};

const mapStateToProps = state => state.pipeline;

export default connect(mapStateToProps, {
  cancelProcessing,
})(operationProgress);
