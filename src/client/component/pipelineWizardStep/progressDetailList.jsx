import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Grid } from 'material-ui';
import ProgressDetail from './progressDetail';

class ProgressDetailList extends Component {
  constructor(props) {
    super(props);
    this.selectProcess = this.selectProcess.bind(this);
  }

  selectProcess(process) {
    this.setState({ activeProcess: process });
  }

  render() {
    const { activeProcess } = this.state;
    return (
      <Grid container>
        <Grid item xs={4}>
          <List>
            {this.props.processes.map(process => (
              <ListItem
                button
                onClick={() => this.selectProcess(process)}
                key={process.operationName}
              >
                <ListItemText primary={process.operationName} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          {activeProcess && <ProgressDetail {...activeProcess} />}
        </Grid>
      </Grid>
    );
  }
}

ProgressDetailList.propTypes = {
  processes: PropTypes.arrayOf(ProgressDetail.propTypes).isRequired,
};

export default ProgressDetailList;
