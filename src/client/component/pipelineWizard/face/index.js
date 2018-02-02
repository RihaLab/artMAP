import { withStyles, CardActions } from 'material-ui';

export WizardFaceBPLength from './wizardFaceBPLength';
export WizardFaceSkipConversion from './wizardFaceSkipConversion';
export WizardFaceTypeOfData from './wizardFaceTypeOfData';
export WizardFaceDataInput from './wizardFaceDataInput/wizardFaceDataInput';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export const CenteredCardActions = withStyles(styles)(CardActions);
