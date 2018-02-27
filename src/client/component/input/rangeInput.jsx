import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import { Typography } from 'material-ui';
import styles from './sliderStyle';

export default class RangeInput extends Component {
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
    const { min, max } = this.props;
    const values = this.state.value;
    const marks = {};
    marks[min] = <Typography variant="body1" gutterBottom>{min}</Typography>;
    marks[max] = <Typography variant="body1" gutterBottom>{max}</Typography>;
    marks[values[0]] =
      <Typography variant="body1" gutterBottom><strong>{values[0]}</strong></Typography>;
    marks[values[1]] =
      <Typography variant="body1" gutterBottom><strong>{values[1]}</strong></Typography>;

    return (
      <Range
        allowCross={false}
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

RangeInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

RangeInput.defaultProps = {
  min: 0,
  max: 100,
};
