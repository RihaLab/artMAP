import React from 'react';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanel,
  Grid,
} from 'material-ui';
import { ExpandMore as IconMore } from 'material-ui-icons';
import { PipelineOperationProps } from '../../../propTypes';
import OperationResultIcon from './operationResultIcon';
import OperationLogList from './operationLogList';

export default function OperationListEntry({ name, result, log }) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<IconMore />}>
        <Grid container>
          <Grid item xs={1}>
            <OperationResultIcon result={result} />
          </Grid>
          <Grid item>
            <Typography type="subheading">{name}</Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container>
          <Grid item xs={1} />
          <Grid item>
            <OperationLogList log={log} />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

OperationListEntry.propTypes = PipelineOperationProps;

