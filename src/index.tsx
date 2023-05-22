import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider,
  ThemeOptions,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

import reportWebVitals from './reportWebVitals';

import { RoutesPaths } from './constants'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Login } from './components/Login/Login'
import { CheckAuthRoute } from './components/CheckAuthRoute/CheckAuthRoute'

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

let theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
