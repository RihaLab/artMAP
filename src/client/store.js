import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { errorMiddleware, socketMiddleware } from './middleware';
import reducers from './reducer';

export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

// eslint-disable-next-line no-underscore-dangle,no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(
    errorMiddleware,
    socketMiddleware,
    thunk,
    routerMiddleware,
  )),
);

export default store;
