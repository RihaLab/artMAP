import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Button, Typography } from 'material-ui';
import { CenteredCardActions } from '.';
import BackButton from '../../backButton';

const wizardFaceTypeOfData = ({ goToNextStep }) => (
  <Grid container spacing={40}>
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Typography align="center" type="display1" gutterBottom>bp &gt; 100</Typography>
          <Typography type="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit auctor eros eu
            mollis. Etiam dignissim tempor velit ut pulvinar. Suspendisse ipsum velit, suscipit et
            nisi a, pellentesque condimentum tellus. Mauris quis mattis ex, eu tempus risus.
            Maecenas aliquam orci metus, eu interdum massa hendrerit ultricies. Maecenas dolor eros,
            efficitur.
          </Typography>
        </CardContent>
        <CenteredCardActions>
          <Button raised color="primary" onClick={() => goToNextStep({ bigBP: true })}>
            I have data with bp &gt; 100
          </Button>
        </CenteredCardActions>
      </Card>
    </Grid>
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Typography align="center" type="display1" gutterBottom>bp &le; 100</Typography>
          <Typography type="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit auctor eros eu
            mollis. Etiam dignissim tempor velit ut pulvinar. Suspendisse ipsum velit, suscipit et
            nisi a, pellentesque condimentum tellus. Mauris quis mattis ex, eu tempus risus.
            Maecenas aliquam orci metus, eu interdum massa hendrerit ultricies. Maecenas dolor eros,
            efficitur.
          </Typography>
        </CardContent>
        <CenteredCardActions>
          <Button raised color="primary" onClick={() => goToNextStep({ bigBP: false })}>
            I have data with bp &le; 100
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

wizardFaceTypeOfData.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default wizardFaceTypeOfData;
