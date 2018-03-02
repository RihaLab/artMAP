import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemSecondaryAction,
  withStyles,
} from 'material-ui';
import { reduxForm, Field } from 'redux-form';
import { SwitchInput } from '../../component';
import DepthRangeInput from './component/depthRangeInput';
import FrequencyThresholdInput from './component/frequencyThresholdInput';

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
                component={SwitchInput}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListSubheader>PCR duplicates</ListSubheader>
          <ListItem>
            <ListItemText primary="Remove PCR duplicates" />
            <ListItemSecondaryAction>
              <Field
                name="removePcrDuplicates"
                component={SwitchInput}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListSubheader>Filter</ListSubheader>
          <ListItem>
            <ListItemText primary="Depth filter" />
          </ListItem>
          <ListItem>
            <Field
              name="depthFilter"
              label="Ouuu some label"
              component={DepthRangeInput}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Frequency threshold" />
          </ListItem>
          <ListItem>
            <Field
              name="frequencyThreshold"
              label="Ouuu some label"
              component={FrequencyThresholdInput}
            />
          </ListItem>
        </List>
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
      width: 350,
    },
  };

  const StyledPipelineAdditionalSettings = withStyles(style)(PipelineAdditionalSettings);
  return <StyledPipelineAdditionalSettings {...props} />;
}

export default reduxForm({
  form: 'wizardDataInput',
  initialValues: {
    runQualityControl: true,
    removePcrDuplicates: true,
    depthFilter: [10, 100],
    frequencyThreshold: 30,
  },
})(styledPipelineAdditionalSettings);
