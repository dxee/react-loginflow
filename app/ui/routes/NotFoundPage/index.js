import Lazyloader from '../lazyloader';
import ROT from '../consts';

export default (store) => (
  new Lazyloader({
    store,
    path: ROT.NOTFOUND,
    getComponentModule: () => import('ui/share/containers/NotFoundPage'),
  })
);
