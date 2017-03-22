import { createSelector } from 'reselect';

import RDC from '../reducers/consts';

const getAuth = () => (state) => state.get(RDC.AUTH.I);

export const isLogged = () => createSelector(
  getAuth(),
  (authState) => authState.get(RDC.AUTH.LOGGEDIN)
);

export const selectToken = () => createSelector(
  getAuth(),
  (authState) => authState.get(RDC.AUTH.TOKEN)
);

export const selectUser = () => createSelector(
  getAuth(),
  (authState) => authState.get(RDC.AUTH.USER)
);

export const getLoginForm = () => (state) => state.getIn([RDC.AUTH.I, RDC.AUTH.LOGINFORM.I]);

export const selectLoginForm = () => createSelector(
  getLoginForm(),
  (loginFormState) => loginFormState
);

export const selectUserName = () => createSelector(
  getLoginForm(),
  (loginFormState) => loginFormState.get(RDC.AUTH.LOGINFORM.USERNAME)
);

export const selectPWD = () => createSelector(
  getLoginForm(),
  (loginFormState) => loginFormState.get(RDC.AUTH.LOGINFORM.PWD)
);
