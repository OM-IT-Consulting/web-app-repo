import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import LoginPage from './features/login/LoginPage';

export const Routes = (props) => (
  <BrowserRouter basename="/app">
    <div>
      <Switch>
        <Route
          path="/login"
          render={(routeProps) => (
            <LoginPage {...routeProps} historyProps={history} />
          )}
        />
        <Redirect to={{
          pathname: '/login',
          state: {}
        }}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;

