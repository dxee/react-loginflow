import APICONSTS from '../api/consts';
import api from '../api/intl';
import { log } from '../actions';
import { localeChanged } from '../actions/intl';
import { createRequestSaga } from '../sagas';

export const getLocaleWatcher = createRequestSaga({
  request: api.getLocale,
  key: APICONSTS.REQKEY.GETLOCALE,
  success: [
    (msgs, { args: [locale, module] }) => localeChanged({ locale, module, msgs }),
  ],
  failure: [
    (error) => log(error),
  ],
});
