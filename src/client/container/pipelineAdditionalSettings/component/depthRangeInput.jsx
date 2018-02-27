import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import { RangeInput } from '../../../component';
import DrawerSliderWrapper from './drawerSliderWrapper';

export default function DepthRangeInput({ input, slider }) {
  return (
    <DrawerSliderWrapper>
      <RangeInput onChange={input.onChange} value={input.value} {...slider} />
    </DrawerSliderWrapper>
  );
}

DepthRangeInput.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  slider: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
};

DepthRangeInput.defaultProps = {
  slider: {
    min: 0,
    max: 200,
  },
};
