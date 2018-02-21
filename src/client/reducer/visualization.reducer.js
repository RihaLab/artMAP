import { GRAPH_DATA_RESOLVED } from '../action/visualization/visualization.action';

const defaultState = {
  graphs: [],
};

export default function visualizationReducer(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_DATA_RESOLVED: {
      return Object.assign({}, { graphs: action.graphs });
    }
    default:
      return state;
  }
}
