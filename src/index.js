import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';

import './index.css';
import reducers from './root_reducer';
import routes from './routes';

const specialStore = createStore(reducers, {}, compose(
  applyMiddleware(promise),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    <Provider store={specialStore}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  , document.getElementById('root'));
