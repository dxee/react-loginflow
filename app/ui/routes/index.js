import { isLogged } from 'store/selectors/auth';
import Lazyloader from './lazyloader';
import loginPage from './LoginPage';
import authRoutes from './AuthRoutes';
import notFoundPage from './NotFoundPage';

export const checkAuth = (store) => (
  (nextState, replace) => {
    const loggedIn = isLogged()(store.getState());
    if (!loggedIn) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  }
);

export default (store) => ({
  childRoutes: [
    new Lazyloader({
      store,
      getComponentModule: () => import('ui/backend/containers/App'),
      getReducerModule: () => import('store/reducers/app'),
      getSagaModule: () => import('store/sagas/app'),
      childRoutes:
      [
        loginPage(store),
        authRoutes(store),
        notFoundPage(store),
      ],
    }),
  ],
});
