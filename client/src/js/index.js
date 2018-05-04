
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from '@components';
import configureStore from './store';

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
