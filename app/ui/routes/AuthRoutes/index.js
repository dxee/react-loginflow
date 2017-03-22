import Lazyloader from '../lazyloader';
import { checkAuth } from '../index';

export default (store) => (
  new Lazyloader({
    store,
    getComponentModule: () => import('ui/backend/containers/Auth'),
    onEnter: () => { checkAuth(store); },
    childRoutes:
    [
    ],
  })
);
