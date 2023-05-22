import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';

import { RoutesPaths } from './constants'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Login } from './components/Login/Login'
import { CheckAuthRoute } from './components/CheckAuthRoute/CheckAuthRoute'

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect
            to={{
              pathname: RoutesPaths.Dashboard,
            }}
          />
        </Route>
        <CheckAuthRoute path={RoutesPaths.Dashboard}>
          <Dashboard />
        </CheckAuthRoute>
        <CheckAuthRoute
          path={RoutesPaths.Login}
          reverse={true}
          redirectPath={RoutesPaths.Dashboard}
        >
          <Login />
        </CheckAuthRoute>
        <Route path='*'>
          <h1>404 - Not Found</h1>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
