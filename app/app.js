import 'babel-polyfill';

import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from 'store';
import { getLocationState } from 'store/selectors';
import UI from 'ui';

import 'sanitize.css/sanitize.css';
import 'ui/global-style';

configureStore(browserHistory, (store) => {
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: getLocationState(),
  });

  intlCompatible(store, history);
});

function intlCompatible(store, history) {
  if (!window.Intl) {
    (new Promise((resolve) => {
      resolve(import('intl'));
    }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/zh.js'),
    ]))
    .then(() => doRender(store, history))
    .catch((err) => {
      throw err;
    });
  } else {
    doRender(store, history);
  }
}

function doRender(store, history) {
  ReactDOM.render(<UI store={store} history={history} />, document.getElementById('app'));
}
