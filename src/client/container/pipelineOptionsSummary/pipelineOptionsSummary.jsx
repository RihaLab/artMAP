import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Card, CardContent, Typography } from 'material-ui';
import { connect } from 'react-redux';

function PipelineOptionsSummary({ pairEnd, bigBP, skipBamConversion }) {
  return (
    <Card>
      <CardContent>
        <Typography align="center" type="display1" gutterBottom>Summary</Typography>
        <List>
          <ListItem button>
            <ListItemText primary={`Type of data: ${pairEnd ? 'Paired end' : 'Single end'}`} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={`Length of reads: ${bigBP ? 'bp \u003E 100' : 'bp \u2264 100'}`} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={`Data format: ${skipBamConversion ? 'FASTQ' : 'BAM'}`} />
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
};

function mapStateToProps(state) {
  return state.wizard.steps;
}

export default connect(mapStateToProps, {})(PipelineOptionsSummary);
