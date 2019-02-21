import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Route, HashRouter } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Copagos from './components/Copagos/Copagos';
import Notificaciones from './components/Notifications/Notificaciones';
import Geocartilla from './components/Geocartilla/Geocartilla';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import ErrorScreen from './components/Error/Error';
import Debit from './components/Debit/Debit';
import CredentialPage from './components/Credential/CredentialPage';
import AccountStatus from './components/AccountStatus/AccountStatus';
import Configuration from './components/Configuration/Configuration';

import './scss/index.scss';

// import * as serviceWorker from './serviceWorker';

const startApp = () => {
  ReactDOM.render(
    <HashRouter>
      <div className="main">
        <Header />
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/copagos" component={Copagos} />
          <Route path="/news" component={Notificaciones} />
          <Route path="/waze" component={Geocartilla} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/debit" component={Debit} />
          <Route path="/credencial" component={CredentialPage} />
          <Route path="/estadodecuenta" component={AccountStatus} />
          <Route path="/configuration" component={Configuration} />
          <Route path="/error" component={ErrorScreen} />
        </div>
      </div>
    </HashRouter>,
    document.getElementById('root'),
  );

  if (typeof PushNotification !== 'undefined') {
    const push = window.PushNotification.init({
      android: {
        sound: true,
        vibrate: true,
        clearNotifications: false,
        topics: ['all'],
      },
    });

    push.on('registration', (data) => {
      console.log(`registration event: ${data.registrationId}`);
      const oldRegId = localStorage.getItem('registrationId');
      if (oldRegId !== data.registrationId) {
        // Save new registration ID
        localStorage.setItem('registrationId', data.registrationId);
        // Post registrationId to your app server as the value has changed
      }
    });

    push.on('notification', (data) => {
      console.log('notification event');
      console.log(data);
      localStorage.setItem('lastMessage', data);
    });

    push.on('error', (e) => {
      console.log(`push error = ${e.message}`);
    });
  }
};

if (!window.cordova) {
  startApp();
} else {
  document.addEventListener('deviceready', startApp, false);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
