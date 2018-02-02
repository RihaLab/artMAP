import PropTypes from 'prop-types';
import React from 'react';
import { Grid, Card, CardContent, Button, Typography } from 'material-ui';
import BackButton from '../../backButton';
import { CenteredCardActions } from '.';

const wizardFaceSkipConversion = ({ goToNextStep }) => (
  <Grid container spacing={40}>
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Typography align="center" type="display1" gutterBottom>Input files are in BAM format</Typography>
          <Typography type="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit auctor eros eu
            mollis. Etiam dignissim tempor velit ut pulvinar. Suspendisse ipsum velit, suscipit et
            nisi a, pellentesque condimentum tellus. Mauris quis mattis ex, eu tempus risus.
            Maecenas aliquam orci metus, eu interdum massa hendrerit ultricies. Maecenas dolor eros,
            efficitur.
          </Typography>
        </CardContent>
        <CenteredCardActions>
          <Button raised color="primary" onClick={() => goToNextStep({ skipBamConversion: false })}>
            I have data in BAM format
          </Button>
        </CenteredCardActions>
      </Card>
    </Grid>
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Typography align="center" type="display1" gutterBottom>Input files are in FastQ format</Typography>
          <Typography type="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit auctor eros eu
            mollis. Etiam dignissim tempor velit ut pulvinar. Suspendisse ipsum velit, suscipit et
            nisi a, pellentesque condimentum tellus. Mauris quis mattis ex, eu tempus risus.
            Maecenas aliquam orci metus, eu interdum massa hendrerit ultricies. Maecenas dolor eros,
            efficitur.
          </Typography>
        </CardContent>
        <CenteredCardActions>
          <Button raised color="primary" onClick={() => goToNextStep({ skipBamConversion: true })}>
            I have data in FastQ format
          </Button>
        </CenteredCardActions>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="flex-end">
        <Grid item>
          <BackButton />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

wizardFaceSkipConversion.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default wizardFaceSkipConversion;
