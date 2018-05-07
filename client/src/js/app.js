import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import { App } from '@components';
import configureStore from './store';

const ReduxApp = () => {
  return (
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
};

export default (module.hot ? hot(module)(ReduxApp) : ReduxApp);
