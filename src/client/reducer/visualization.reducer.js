import { GRAPH_DATA_RESOLVED } from '../action/visualization/visualization.action';
import { RESTART_WIZARD } from '../action/wizard/wizard.action';

const defaultState = {
  graphs: [],
};

export default function visualizationReducer(state = defaultState, action) {
  switch (action.type) {
    case GRAPH_DATA_RESOLVED: {
      return Object.assign({}, { graphs: action.graphs });
    }
    case RESTART_WIZARD: {
      return defaultState;
    }
    default:
      return state;
  }
}
