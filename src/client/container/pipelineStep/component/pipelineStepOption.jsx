import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button } from 'material-ui';
import { CardActions } from '../../../component';

export default function PipelineStepOption(props) {
  return (
    <Card>
      <CardContent>
        <Typography align="center" type="display1" gutterBottom>{props.title}</Typography>
        <Typography type="body2">{props.description}</Typography>
      </CardContent>
      <CardActions>x
        <Button raised color="primary" onClick={props.onSelect}>
          {props.actionTitle}
        </Button>
      </CardActions>
    </Card>
  );
}

PipelineStepOption.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  actionTitle: PropTypes.string.isRequired,
};

PipelineStepOption.defaultProps = {
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit auctor eros eu mollis. Etiam dignissim tempor velit ut pulvinar. Suspendisse ipsum velit, suscipit et nisi a, pellentesque condimentum tellus. Mauris quis mattis ex, eu tempus risus. Maecenas aliquam orci metus, eu interdum massa hendrerit ultricies. Maecenas dolor eros, efficitur.',
};
