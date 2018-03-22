import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import ReactModal from 'react-modal';
import store, { history } from './store';
import { PipelineWizard } from './container';
import { AppWrapper } from './component';

const provider = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppWrapper>
        <div>
          <Route exact path="/" component={PipelineWizard} />
        </div>
      </AppWrapper>
    </ConnectedRouter>
  </Provider>
);

ReactModal.setAppElement('#root');
render(provider, document.getElementById('root'));

