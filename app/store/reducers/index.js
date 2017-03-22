import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import ACT from '../actions/consts';
import RDC from './consts';
import { intlRdc } from './intl';
import { authRdc } from './auth';
import { checkStore } from '../index';

const intRdc = [
  {
    name: RDC.ROUTE.I,
    rdc: routeReducer,
  },
  {
    name: RDC.REQUESTS.I,
    rdc: requestsReducer,
  },
  {
    name: RDC.INTL.I,
    rdc: intlRdc,
  },
  {
    name: RDC.AUTH.I,
    rdc: authRdc,
  },
];

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

const requestsInitialState = fromJS({});

function routeReducer(state = routeInitialState, { type, payload }) {
  // console.log(type, payload);
  switch (type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: payload,
      });
    default:
      return state;
  }
}

function requestsReducer(state = requestsInitialState, { type, pld, meta }) {
  switch (type) {
    case ACT.MARKREQUEST.PENDING:
      return state.set(meta.key, { status: RDC.VAL.MARKREQUEST.PENDING, error: null });
    case ACT.MARKREQUEST.SUCCESS:
      return state.set(meta.key, { status: RDC.VAL.MARKREQUEST.SUCCESS, error: null });
    case ACT.MARKREQUEST.FAILED:
      return state.set(meta.key, { status: RDC.VAL.MARKREQUEST.FAILED, error: pld });
    case ACT.MARKREQUEST.CANCELLED:
      return state.set(meta.key, { status: RDC.VAL.MARKREQUEST.CANCELLED, error: null });
    default:
      return state;
  }
}

function mapToRdc(rdcs, newRdcs) {
  newRdcs.map((newRdc) => {
    const { name, rdc } = newRdc;
    invariant(
      isString(name) && !isEmpty(name) && isFunction(rdc),
      'injectAsyncReducer: Expected `newRdc` to be a reducer function'
    );

    if (Reflect.has(rdcs, name)) {
      return newRdc;
    }

    rdcs[name] = rdc;// eslint-disable-line no-param-reassign
    return newRdc;
  });
}

export function injectAsyncReducer(store, asyncReducers, doValid) {
  if (doValid) {
    checkStore(store);
  }
  mapToRdc(store.asyncReducers, asyncReducers);
  store.replaceReducer(combineReducers(store.asyncReducers));
}

export function combineReducer() {
  const defaultRdc = {};
  mapToRdc(defaultRdc, intRdc);
  return defaultRdc;
}

