import { createSelector } from 'reselect';

import RDC from '../reducers/consts';

// ========================requests
const getRequests = () => (state) => state.get(RDC.REQUESTS.I);

export const getRequest = (key) => createSelector(
  getRequests(),
  (requestsState) => requestsState.get(key)
);

export const areRequestsPending = (key) => createSelector(
  getRequests(key),
  (requestsState) => Object.keys(requestsState)
    .some((key1) => {
      if (!requestsState || !requestsState[key1]) {
        return false;
      }
      return requestsState[key1].status === RDC.VAL.MARKREQUEST.PENDING;
    })
);

// ========================route
const getRoute = () => (state) => state.get(RDC.ROUTE.I);

export const getCurrentPathname = () => createSelector(
  getRoute(),
  (routeState) => routeState.get('locationBeforeTransitions').get('pathname')
);

export const getLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get(RDC.ROUTE.I); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
