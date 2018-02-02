import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel } from 'material-ui';

class ProgressDetailLog extends Component {
  constructor(props) {
    super(props);
    this.expandPanel = this.expandPanel.bind(this);
    this.collapsePanel = this.collapsePanel.bind(this);
    this.state = {
      isExpanded: false,
    };
  }

  expandPanel() {
    this.setState({ isExpanded: true });
  }

  collapsePanel() {
    this.setState({ isExpanded: false });
  }

  render() {
    const { message, date } = this.props;
    const trimmedMessage = message.length < 30 ? message : message.substring(0, 27).concat('...');
    const handleChange = this.state.isExpanded ? this.collapsePanel : this.expandPanel;
    return (
      <ExpansionPanel expanded={this.state.isExpanded} onChange={handleChange}>
        <ExpansionPanelSummary>
          <Typography>{date}</Typography>
          <Typography>{trimmedMessage}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{message}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

ProgressDetailLog.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.string.isRequired,
};

export default ProgressDetailLog;
