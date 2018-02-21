import React from 'react';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanel,
} from 'material-ui';
import { ExpandMore as IconMore } from 'material-ui-icons';
import { PipelineOperationProps } from '../../../propTypes';
import OperationResultIcon from './operationResultIcon';
import OperationLogList from './operationLogList';

export default function OperationListEntry({ name, result, log }) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<IconMore />}>
        <OperationResultIcon result={result} />
        <Typography type="subheading">{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <OperationLogList log={log} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

OperationListEntry.propTypes = PipelineOperationProps;

