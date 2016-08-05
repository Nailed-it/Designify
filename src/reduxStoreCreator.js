import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './root.reducer';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

//<editor-fold desc="Define Redux browser extension middleware">
let windowDevToolsExtension;
try {
  // This will throw an error when run outside a browser
  windowDevToolsExtension = window.devToolsExtension ? window.devToolsExtension() : f => f;
} catch (e) {
  // If it throws an error, leave windowDevToolsExtension undefined
}

//</editor-fold>

//<editor-fold desc="Create middleware array">
// This is an array of middleware. The objects have properties
// that determine whether each middleware will be included in the
// store or not, based on the environment/mode.
const allMiddleware = [
  {
    middleware: applyMiddleware(promise, reduxThunk),
    production:  true,
    development: true,
    test:        true,
  },
  {
    middleware: windowDevToolsExtension,
    production:  true,
    development: true,
    test:        false,
  },
];

//</editor-fold>

//<editor-fold desc="Create storCreator function">
// This function, when invoked, will create a store. It begins with the
// allMiddleware array, and filters it according to whether each middleware
// matches the `mode` parameter. Then it maps the array to return just the
// middleware values.
function storeCreator(mode = 'development') {
  return createStore(reducers, {}, compose(
    ...allMiddleware
      .filter(middleware => middleware[mode])
      .map(middleware => middleware.middleware)
  ));
}

//</editor-fold>

export default storeCreator;
