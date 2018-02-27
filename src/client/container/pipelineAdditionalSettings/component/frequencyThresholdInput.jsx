import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import { SliderInput } from '../../../component';
import DrawerSliderWrapper from './drawerSliderWrapper';

export default function FrequencyThresholdInput({ input, slider }) {
  const markFormatter = e => `${e}%`;
  return (
    <DrawerSliderWrapper>
      <SliderInput
        value={input.value}
        marks={[50]}
        markTextFormatter={markFormatter}
        onChange={input.onChange}
        {...slider}
      />
    </DrawerSliderWrapper>
  );
}

FrequencyThresholdInput.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  slider: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
};

FrequencyThresholdInput.defaultProps = {
  slider: {
    min: 0,
    max: 100,
  },
};
