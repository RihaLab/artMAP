import React, { Component } from 'react';
import { Button, Tooltip } from 'material-ui';
import { Settings as IconSettings } from 'material-ui-icons';
import PipelineAdditionalSettings from './pipelineAdditionalSettings';

export default class PipelineAdditionalSettingsButton extends Component {
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
        <PipelineAdditionalSettings
          isOpen={this.state.isOpen}
          onClose={this.closeDrawer}
        />
      </div>
    );
  }
}
