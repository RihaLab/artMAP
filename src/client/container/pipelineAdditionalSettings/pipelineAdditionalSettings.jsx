import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  withStyles,
} from 'material-ui';
import { reduxForm, Field } from 'redux-form';
import { SwitchInput } from '../../component';

function PipelineAdditionalSettings(props) {
  return (
    <Drawer anchor="right" open={props.isOpen} onClose={props.onClose}>
      <div className={props.classes.list}>
        <List>
          <ListSubheader>Quality control</ListSubheader>
          <ListItem>
            <ListItemText primary="Run quality control" />
            <ListItemSecondaryAction>
              <Field
                name="runQualityControl"
                label="Ouuu some label"
                component={SwitchInput}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
}

PipelineAdditionalSettings.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

PipelineAdditionalSettings.defaultProps = {
  isOpen: false,
  onClose: null,
};

function styledPipelineAdditionalSettings(props) {
  const style = {
    list: {
      width: 250,
    },
  };

  const StyledPipelineAdditionalSettings = withStyles(style)(PipelineAdditionalSettings);
  return <StyledPipelineAdditionalSettings {...props} />;
}

export default reduxForm({
  form: 'wizardDataInput',
  initialValues: {
    runQualityControl: true,
  },
})(styledPipelineAdditionalSettings);
