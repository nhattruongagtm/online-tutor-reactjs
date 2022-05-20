import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ScrollToTop from './components/ScrollToTop';
import { Route, Switch } from 'react-router';
import { ADMIN_PATH } from './constants/path';
import DashBoard from './Admin/pages/Dashboard';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './utils';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <Switch>
          <Route exact path={ADMIN_PATH}>
            <DashBoard />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
