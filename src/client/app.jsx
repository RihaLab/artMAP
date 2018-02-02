import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import ReactModal from 'react-modal';
// eslint-disable-next-line import/extensions,import/no-unresolved,import/no-extraneous-dependencies
import { charts } from 'charts';
import store, { history } from './store';
import { Pipeline } from './container';
import { AppWrapper } from './component/appWrapper';

const provider = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppWrapper>
        <div>
          <Route exact path="/" component={Pipeline} />
        </div>
      </AppWrapper>
    </ConnectedRouter>
  </Provider>
);

ReactModal.setAppElement('#root');

charts.load('current', { packages: ['corechart'] });
charts.setOnLoadCallback(() => render(provider, document.getElementById('root')));
