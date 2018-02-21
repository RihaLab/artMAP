import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './component/button';
import { goToPrevStep } from '../../action';

export default function BackButton({ onClick }) {
  if (onClick === null) {
    const ConnectedButton = connect(null, { onClick: goToPrevStep })(Button);
    return <ConnectedButton />;
  }
  return <Button onClick={onClick} />;
}

BackButton.propTypes = {
  onClick: PropTypes.func,
};

BackButton.defaultProps = {
  onClick: null,
};
