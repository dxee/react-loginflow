import { api } from '../api';

export default {
  init() {
    return api('/init', {
      method: 'POST',
    });
  },
};
