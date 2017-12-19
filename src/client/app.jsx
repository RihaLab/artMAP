import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import Dashboard from './container/dashboard.container';
import store from './store';

const history = syncHistoryWithStore(createBrowserHistory(), store);

const provider = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Dashboard} />
    </Router>
  </Provider>);


// eslint-disable-next-line no-undef
render(provider, document.getElementById('root'));
