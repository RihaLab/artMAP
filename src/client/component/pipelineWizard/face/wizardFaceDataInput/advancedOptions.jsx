import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from 'material-ui';
import { connect } from 'react-redux';

const advancedOptions = ({ pairEnd, bigBP, skipBamConversion }) => (
  <List>
    <ListItem button>
      <ListItemText primary={`Type of data: ${pairEnd ? 'Paired end' : 'Single end'}`} />
    </ListItem>
    <ListItem button>
      <ListItemText primary={`Length of reads: ${bigBP ? 'BP > 70' : 'BP < 70'}`} />
    </ListItem>
    <ListItem button>
      <ListItemText primary={`Data format: ${skipBamConversion ? 'FASTQ' : 'BAM'}`} />
    </ListItem>
  </List>
);

advancedOptions.propTypes = {
  pairEnd: PropTypes.bool.isRequired,
  bigBP: PropTypes.bool.isRequired,
  skipBamConversion: PropTypes.bool.isRequired,
};

const mapStateToProps = state => state.wizard.steps;

export default connect(mapStateToProps, {})(advancedOptions);
