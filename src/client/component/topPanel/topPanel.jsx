import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';

export default function TopPanel() {
  return (
    <AppBar>
      <Toolbar>
        <Typography color="inherit" type="title">AraMAP</Typography>
      </Toolbar>
    </AppBar>
  );
}
