import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography, Button } from 'material-ui';
import { CenteredCardActions } from '.';

const wizardFaceTypeOfData = ({ goToNextStep }) => (
  <Grid container spacing={40}>
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Typography align="center" type="display1" gutterBottom>Single end</Typography>
          <Typography type="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit auctor eros eu
            mollis. Etiam dignissim tempor velit ut pulvinar. Suspendisse ipsum velit, suscipit et
            nisi a, pellentesque condimentum tellus. Mauris quis mattis ex, eu tempus risus.
            Maecenas aliquam orci metus, eu interdum massa hendrerit ultricies. Maecenas dolor eros,
            efficitur.
          </Typography>
        </CardContent>
        <CenteredCardActions>
          <Button raised color="primary" onClick={() => goToNextStep({ pairEnd: false })}>
            I have single end data
          </Button>
        </CenteredCardActions>
      </Card>
    </Grid>
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Typography align="center" type="display1" gutterBottom>Paired end</Typography>
          <Typography type="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit auctor eros eu
            mollis. Etiam dignissim tempor velit ut pulvinar. Suspendisse ipsum velit, suscipit et
            nisi a, pellentesque condimentum tellus. Mauris quis mattis ex, eu tempus risus.
            Maecenas aliquam orci metus, eu interdum massa hendrerit ultricies. Maecenas dolor eros,
            efficitur.
          </Typography>
        </CardContent>
        <CenteredCardActions>
          <Button raised color="primary" onClick={() => goToNextStep({ pairEnd: true })}>
            I have paired end data
          </Button>
        </CenteredCardActions>
      </Card>
    </Grid>
  </Grid>
);

wizardFaceTypeOfData.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default wizardFaceTypeOfData;
