import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Tooltip,
  Divider,
  withStyles,
} from 'material-ui';
import { Settings as IconSettings } from 'material-ui-icons';
import { reduxForm, Field } from 'redux-form';
import { SwitchInput } from '../../../input';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.state = { isOpen: false };
  }

  openDrawer() {
    this.setState({ isOpen: true });
  }

  closeDrawer() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <Tooltip title="Additional settings">
          <Button type="button" onClick={this.openDrawer} fab>
            <IconSettings />
          </Button>
        </Tooltip>
        <Drawer anchor="right" open={this.state.isOpen} onClose={this.closeDrawer}>
          <div className={this.props.classes.list}>
            <List>
              <ListSubheader>Quality control</ListSubheader>
              <ListItem>
                <ListItemText primary="Run quality control" />
                <ListItemSecondaryAction>
                  <Field
                    name="skipQC"
                    label="Ouuu some label"
                    component={SwitchInput}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Divider />
          </div>
        </Drawer>
      </div>
    );
  }
}

Summary.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

const style = {
  list: {
    width: 250,
  },
};

const styledSummary = withStyles(style)(Summary);

export default reduxForm({
  form: 'additionSettings',
  initialValues: {
    runQualityControl: true,
  },
})(styledSummary);
