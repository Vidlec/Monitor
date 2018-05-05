
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import { App } from '@components';
import configureStore from './store';

const HotApp = hot(module)(App);

render(
  <Provider store={configureStore()}>
    <HotApp />
  </Provider>,
  document.getElementById('app'),
);
