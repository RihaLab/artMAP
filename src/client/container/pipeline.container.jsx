import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  startPipeline as startOperation,
  cancelPipeline as cancelOperation,
} from '../actions/pipeline/actions';
import { resetOperationInfo } from '../actions/general/actions';
import PipelineForm from '../components/pipeline/PipelineForm';
import ProgressBar from '../components/pipeline/ProgressBar';
import OperationStatus from '../components/operation/OperationStatus';
import BarChart from '../components/pipeline/BarChart';

function Pipeline(props) {
  return (
    <div>
      <div className="pull-right">
        <OperationStatus operationStatus={props.operationState} />
      </div>
      <h2>Pipeline</h2>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <PipelineForm startOperation={props.startOperation} />
        </div>
        <div className="col-md-4">
          {props.operations.map(op => <ProgressBar key={op.name} {...op} />)}
        </div>
      </div>
      <div className="row">
        <hr />
        <div className="col-md-12">
          {Object.keys(props.graphs).map(chromosome =>
            (
              <div className="col-md-6" key={chromosome}>
                <BarChart
                  key={chromosome}
                  title={chromosome}
                  data={props.graphs[chromosome].data}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

Pipeline.propTypes = {
  operations: PropTypes.array,
  startOperation: PropTypes.func.isRequired,
  operationState: PropTypes.string,
  graphs: PropTypes.object,
};

function mapStateToProps(state) {
  return state.pipeline.toJS();
}

export default connect(mapStateToProps, {
  startOperation,
  cancelOperation,
  resetOperationInfo,
})(Pipeline);