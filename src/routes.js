import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app/App';
import Content from './app/Content';
import RoomsListContainer from './rooms/containers/roomsList.container';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Content}>
      <Route component={RoomsListContainer} />
    </IndexRoute>
  </Route>
);
