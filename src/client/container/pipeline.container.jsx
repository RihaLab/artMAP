import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startPipeline } from '../action/pipeline/pipeline.action';

function Pipeline(props) {
  return (
    <div>
      <h2>Pipeline</h2>
      <hr />
      <div className="row">
        <div className="col-md-8">
        </div>
      </div>
    </div>
  );
}

Pipeline.propTypes = {
  startPipeline: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state.pipeline.toJS();
}

export default connect(mapStateToProps, {
  startPipeline,
})(Pipeline);
