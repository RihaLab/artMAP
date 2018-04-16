import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button } from 'material-ui';
import { CardActions } from '../../../component';

export default function PipelineStepOption(props) {
  return (
    <Card>
      <CardContent>
        <Typography align="center" type="display1" gutterBottom>{props.title}</Typography>
        {props.image}
      </CardContent>
      <CardActions>
        <Button raised color="primary" onClick={props.onSelect}>
          {props.actionTitle}
        </Button>
      </CardActions>
    </Card>
  );
}

PipelineStepOption.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
  actionTitle: PropTypes.string.isRequired,
};

