import { api } from '../api';

export default {
  getLocale(locale, mdl) {
    const l = locale.split('_');
    const lang = l[0];
    const area = l[1];
    return api('/mdl/intl.json', {
      method: 'POST',
      params: {
        mdl,
        lang,
        area,
      },
    });
  },
};
