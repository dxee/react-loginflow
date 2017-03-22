import ROT from '../consts';
import Lazyloader from '../lazyloader';


export default (store) => (
  new Lazyloader({
    store,
    path: ROT.LOGIN,
    getComponentModule: () => import('ui/backend/containers/Login'),
    getSagaModule: () => import('store/sagas/auth'),
    getReducerModule: () => import('store/reducers/auth'),
  })
);
