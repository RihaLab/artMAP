import React from 'react';
import { CardActions as CardActionsMui, withStyles } from 'material-ui';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default function CardActions(props) {
  const StyledCardActions = withStyles(styles)(CardActionsMui);
  return <StyledCardActions {...props} />;
}

