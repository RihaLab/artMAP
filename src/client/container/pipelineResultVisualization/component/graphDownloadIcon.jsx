import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, withStyles } from 'material-ui';
import { FileDownload as IconDownload } from 'material-ui-icons';

const styles = {
  button: {
    position: 'absolute',
    marginTop: '14px',
    marginLeft: '-100px',
  },
};

function GraphDownloadIcon(props) {
  return (
    <Tooltip title="Save graph as PNG">
      <IconButton
        onClick={props.onClick}
        className={props.classes.button}
        aria-label="Save graph as PNG"
      >
        <IconDownload />
      </IconButton>
    </Tooltip>
  );
}

GraphDownloadIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GraphDownloadIcon);

