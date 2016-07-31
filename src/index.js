import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app/App';
import './index.css';
import reducers from './root_reducer';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const store = createStore(reducers);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.getElementById('root')
  );
}

render();
store.subscribe(render);
