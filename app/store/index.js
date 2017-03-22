import invariant from 'invariant';
import createSagaMiddleware from 'redux-saga';

import { conformsTo, isFunction, isObject } from 'lodash';
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { routerMiddleware } from 'react-router-redux';
import { combineReducer } from './reducers';

const initialState = fromJS({
});

const sagaMiddleware = createSagaMiddleware();


export const checkStore = (store) => {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
};

export const configureStore = (history, callback) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */
  const rdcs = combineReducer();
  const store = createStore(
    combineReducers(rdcs),
    initialState,
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = rdcs;

  callback(store, history);
};

