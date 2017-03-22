import { injectAsyncReducer } from 'store/reducers';
import { injectAsyncSagas } from 'store/sagas';

export default class Lazyloader {
  constructor({ store, getComponentModule, getReducerModule, getSagaModule,
    getComponent, onEnter, onLeave, ...routeProps }) {
    this.store = store;
    if (typeof getComponentModule === 'function') {
      this.getComponentModule = getComponentModule;
    }

    if (typeof getReducerModule === 'function') {
      this.getReducerModule = getReducerModule;
    }
    if (typeof getSagaModule === 'function') {
      this.getSagaModule = getSagaModule;
    }
    if (typeof getComponent === 'function') {
      this.getComponentCustom = getComponent;
    }
    if (typeof onEnter === 'function') {
      this.onEnterCustom = onEnter;
    }
    if (typeof onLeave === 'function') {
      this.onLeaveCustom = onLeave;
    }
    Object.assign(this, routeProps);
  }

  getComponent(nextState, cb) {
    // console.log('getComponent');
    if (this.getReducerModule) {
      new Promise((resolve) => {
        resolve(this.getReducerModule());
      })
      .then((reducerModule) => injectAsyncReducer(this.store, reducerModule.default, true))
      .catch((err) => {
        this.logErr('Dynamic reducer loading failed', err);
      });
    }

    if (this.getComponentModule) {
      new Promise((resolve) => {
        resolve(this.getComponentModule());
      })
      .then((componentModule) => cb(null, componentModule.default))
      .catch((err) => {
        this.logErr('Dynamic page loading failed', err);
      });
    }
  }

  onEnter(nextState, replace) {
    // console.log('onEnter called.');
    if (this.getSagaModule && !this.loadedSagaTasks) {
      new Promise((resolve) => {
        resolve(this.getSagaModule());
      })
      .then((sagas) => {
        if (!this.loadedSagaTasks) {
          this.loadedSagaTasks = injectAsyncSagas(this.store, sagas.default, true);
        }
        // console.log('onEnter added sagas:', this.loadedSagaTasks);
        if (this.onEnterCustom) {
          this.onEnterCustom(nextState, replace);
        }
      })
      .catch((err) => { this.logErr('Dynamic saga loading failed', err); });
    }
  }

  onLeave(prevState) {
    // console.log('onLeave called.');
    if (this.onLeaveCustom) {
      this.onLeaveCustom(prevState);
    }
    if (this.loadedSagaTasks) {
      this.loadedSagaTasks.forEach((saga) => saga.cancel());
      delete this.loadedSagaTasks;
      // console.log('onLeave deleted sagas:', this.loadedSagaTasks);
    }
  }

  logErr = (msg, stack) => {
    console.error(msg, stack); // eslint-disable-line no-console
  }
}
