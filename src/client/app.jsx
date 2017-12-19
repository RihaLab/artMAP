import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import Dashboard from './container/dashboard.container';
import Pipeline from './container/pipeline.container';
import store, { history } from './store';

const provider = (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route path="/foo" component={Pipeline} />
      </div>
    </Router>
  </Provider>);

// eslint-disable-next-line no-undef
render(provider, document.getElementById('root'));
