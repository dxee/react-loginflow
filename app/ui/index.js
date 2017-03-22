import React, { PropTypes } from 'react';
import { Router, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';


import * as IntelProvider from 'ui/share/containers/LanProvider';
import createRoutes from './routes';

const ui = ({ store, history }) => (
  <Provider store={store}>
    <IntelProvider.default>
      <Router
        history={history}
        routes={createRoutes(store)}
        render={
          applyRouterMiddleware(useScroll())
        }
      />
    </IntelProvider.default>
  </Provider>
);

ui.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ui;
