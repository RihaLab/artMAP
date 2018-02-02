import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackButton from './backButton';
import { goToPrevStep } from '../../action';

export default function ConnectedBackButton(props) {
  if (!props.handleClick) {
    const ConnectButton = connect(null, { handleClick: goToPrevStep })(BackButton);
    return <ConnectButton {...props} />;
  }
  return <BackButton {...props} />;
}

ConnectedBackButton.propTypes = {
// eslint-disable-next-line react/require-default-props
  handleClick: PropTypes.func,
};
