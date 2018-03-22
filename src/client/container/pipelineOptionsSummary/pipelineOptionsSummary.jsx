import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Card, CardContent, Typography } from 'material-ui';
import { connect } from 'react-redux';
import { goToStep } from '../../action';

function PipelineOptionsSummary(props) {
  const { pairEnd, bigBP, skipBamConversion } = props;
  return (
    <Card>
      <CardContent>
        <Typography align="center" type="display1" gutterBottom>Summary</Typography>
        <List>
          <ListItem button onClick={props.goToFormatOfData}>
            <ListItemText primary={`Format of data: ${skipBamConversion ? 'FASTQ' : 'BAM'}`} />
          </ListItem>
          <ListItem button onClick={props.goToLengthOfReads}>
            <ListItemText primary={`Length of reads: ${bigBP ? 'bp \u003E 100' : 'bp \u2264 100'}`} />
          </ListItem>
          <ListItem button onClick={props.goToTypeOfData}>
            <ListItemText primary={`Type of data: ${pairEnd ? 'Paired end' : 'Single end'}`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

PipelineOptionsSummary.propTypes = {
  pairEnd: PropTypes.bool.isRequired,
  bigBP: PropTypes.bool.isRequired,
  skipBamConversion: PropTypes.bool.isRequired,
  goToFormatOfData: PropTypes.func.isRequired,
  goToLengthOfReads: PropTypes.func.isRequired,
  goToTypeOfData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state.wizard.steps;
}

export default connect(mapStateToProps, {
  goToFormatOfData: () => goToStep(0),
  goToLengthOfReads: () => goToStep(1),
  goToTypeOfData: () => goToStep(2),
})(PipelineOptionsSummary);
