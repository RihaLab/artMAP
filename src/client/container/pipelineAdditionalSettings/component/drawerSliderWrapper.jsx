import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

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

export default withStyles(styles)(DrawerSliderWrapper);
