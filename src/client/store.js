import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducer/index.reducer';
import rootEpic from './epic/index.epic';

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();
const defaultState = {};
const epicMiddleware = createEpicMiddleware(rootEpic);
const routerMiddleware = createRouterMiddleware(history);

export default createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware)),
);
