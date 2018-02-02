import { GRAPH_DATA_RESOLVED } from './visualization.action';
import { encodeGetParams } from '../../util';
import config from '../../../../config';

export const getGraphData = file => async (dispatch) => {
  const url = encodeGetParams(`http://${config.host}:${config.port}/api/visualization?`, { file });
  const fileStructure = await fetch(url).then(response => response.json());
  dispatch(graphDataResolved(fileStructure));
};

const graphDataResolved = ({ graphs }) => ({ type: GRAPH_DATA_RESOLVED, graphs });
