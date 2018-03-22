import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from 'material-ui';

const styles = {
  title: {
    paddingBottom: '50px',
  },
};

function PipelineWizardStepTitle(props) {
  return (
    <Typography align="center" type="display2" gutterBottom className={props.classes.title}>
      {props.children}
    </Typography>
  );
}

PipelineWizardStepTitle.propTypes = {
  children: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

PipelineWizardStepTitle.defaultProps = {
  children: '',
};

export default withStyles(styles)(PipelineWizardStepTitle);
