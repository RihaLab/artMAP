import 'rc-slider/assets/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MuiThemeProvider } from 'material-ui';
import { createMuiTheme } from 'material-ui/styles';
import { TopPanel } from '../topPanel';
import { ErrorDialog } from '../../container';
import './style.css';

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
    <MuiThemeProvider theme={theme} >
      <div className="wrapper">
        <Grid container direction="column" alignItems="center" spacing={0}>
          <Grid item xs={12}>
            <TopPanel />
          </Grid>
          <Grid item xs={8} style={{ paddingTop: '80px' }}>
            {children}
          </Grid>
          <ErrorDialog />
        </Grid>
      </div>
      <div className="footer">
        <img className="footer-logo" alt="Artin logo" src="https://www.artin.cz/wp-content/themes/artin/web/img/logo.png" />
        <img className="footer-logo" alt="Ceitec logo" src="https://www.ctt.muni.cz/media/ImageGen.ashx?constrain=true&image=/media/3184989/ceitec.jpg" />
        <img className="footer-logo" alt="MUNI logo" src="https://scienceslam.muni.cz/images/design/mu_logo.png" />
      </div>
    </MuiThemeProvider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
