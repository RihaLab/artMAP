import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

function DrawerSliderWrapper({ children, classes }) {
  return (
    <div className={classes.root}>
      <div className={classes.sliderWrapper}>
        {children}
      </div>
    </div>
  );
}

DrawerSliderWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default function (props) {
  const styles = {
    root: {
      width: '100%',
      paddingBottom: '30px',
      marginTop: '-10px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
    },
    sliderWrapper: {
      width: '85%',
    },
  };

  const StyledDraweSliderWrapper = withStyles(styles)(DrawerSliderWrapper);
  return <StyledDraweSliderWrapper {...props} />;
}
