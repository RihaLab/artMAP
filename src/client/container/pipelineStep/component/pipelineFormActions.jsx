import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from 'material-ui';

const styles = {
  root: {
    marginTop: '20px',
  },
};

function PipelineFormActions(props) {
  return (
    <Grid className={props.classes.root} {...props} />
  );
}

PipelineFormActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PipelineFormActions);

