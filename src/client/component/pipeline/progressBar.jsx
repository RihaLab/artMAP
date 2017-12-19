import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.switchCollapse = this.switchCollapse.bind(this);
    this.state = {
      isInfoCollapsed: true,
    };
  }

  switchCollapse() {
    this.setState({ isInfoCollapsed: !this.state.isInfoCollapsed });
  }

  render() {
    let infoBar = null;
    if (!this.state.isInfoCollapsed) {
      const areaValue = this.props.info.reduce((acc, value) => `${acc}\n${value}`, '').substring(1);
      infoBar = (
        <div className="form-group">
          <textarea className="form-control" rows={5} value={areaValue} />
        </div>
      );
    }
    /* eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions */
    return (
      <div onClick={this.switchCollapse}>
        <h6>{this.props.name}</h6>
        <BootstrapProgressBar now={this.props.progress} active={this.props.progress !== 100} />
        {infoBar}
      </div>
    );
  }
}

ProgressBar.propTypes = {
  name: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  info: PropTypes.arrayOf(PropTypes.string),
};

ProgressBar.defaultProps = {
  info: [],
};
