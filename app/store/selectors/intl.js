import { createSelector } from 'reselect';

import RDC from '../reducers/consts';

export const selectIntl = () => (state) => state.get(RDC.INTL.I);

export const selectLocale = () => createSelector(
  selectIntl(),
  (intlState) => intlState.get(RDC.INTL.LOCALE)
);

export const selectMsgs = () => createSelector(
  selectIntl(),
  (intlState) => intlState.get(RDC.INTL.MSGS)
);

export const selectKey = () => createSelector(
  selectIntl(),
  (intlState) => intlState.get(RDC.INTL.KEY)
);


export const isIntlLoaded = (module) => createSelector(
  selectIntl(),
  (intlState) => {
    if (!intlState) {
      return false;
    }
    const loadedModules = intlState.get(RDC.INTL.MODULES);

    if (!loadedModules) {
      return false;
    }
    return loadedModules.has(module);
  }
);

export const selectLocaleLoadedModules = () => createSelector(
  selectIntl(),
  (intlState) => {
    if (!intlState) {
      return '';
    }
    const loadedModules = intlState.get(RDC.INTL.MODULES);

    if (!loadedModules) {
      return '';
    }
    return loadedModules.join(',');
  }
);

export const selectSptLocales = () => createSelector(
  selectIntl(),
  (intlState) => {
    if (!intlState) {
      return [];
    }
    const sptLocales = intlState.get(RDC.INTL.SPTLOCALES);

    if (!sptLocales) {
      return [];
    }
    return sptLocales.split(',');
  }
);
