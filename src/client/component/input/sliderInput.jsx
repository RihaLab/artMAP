import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import { Typography } from 'material-ui';
import styles from './sliderStyle';

export default class SliderInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: this.props.value,
    };
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    const { min, max, markTextFormatter } = this.props;
    const marks = {};
    marks[min] = <Typography variant="body1" gutterBottom>{markTextFormatter(min)}</Typography>;
    marks[max] = <Typography variant="body1" gutterBottom>{markTextFormatter(max)}</Typography>;
    marks[this.state.value] = (
      <Typography variant="body1" gutterBottom>
        <strong>{markTextFormatter(this.state.value)}</strong>
      </Typography>
    );

    return (
      <Slider
        step={1}
        marks={marks}
        trackStyle={[styles.trackStyle]}
        railStyle={styles.railStyle}
        dotStyle={styles.dotStyle}
        handleStyle={[styles.handleStyle, styles.handleStyle]}
        min={min}
        max={max}
        value={this.state.value}
        onAfterChange={this.props.onChange}
        onChange={this.handleChange}
      />
    );
  }
}

SliderInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  markTextFormatter: PropTypes.func,
};

SliderInput.defaultProps = {
  min: 0,
  max: 100,
  markTextFormatter: e => e,
};
