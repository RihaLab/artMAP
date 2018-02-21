import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MuiThemeProvider } from 'material-ui';
import { createMuiTheme } from 'material-ui/styles';
import { TopPanel } from '../topPanel';
import { ErrorDialog } from '../../container';

export default function AppWrapper({ children }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#76C045',
        contrastText: '#fff',
      },
      secondary: {
        main: '#EF681F',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container direction="column" alignItems="center" spacing={0}>
        <Grid item xs={12}>
          <TopPanel />
        </Grid>
        <Grid item xs={8} style={{ paddingTop: '80px' }}>
          {children}
        </Grid>
        <ErrorDialog />
      </Grid>
    </MuiThemeProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
