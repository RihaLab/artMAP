import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducer/index.reducer';
import rootEpic from './epic/index.epic';

const defaultState = {};
const epicMiddleware = createEpicMiddleware(rootEpic);

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);
