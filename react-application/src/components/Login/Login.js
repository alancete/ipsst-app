import React, { Component } from 'react';
import DataManager from '../DataManager/DataManager';
import logo from '../../images/logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    DataManager.getInstance().loadLoginSection(this);
    window.screen.orientation.lock('portrait');
  }

  login = () => {
    DataManager.getInstance().login();
  }

  render() {
    return (
      <div className="page login">
        <div className="container">
          <div className="form-signin">
            <img alt="IAPOS" className="logo" src={logo} />
            <h2 className="form-signin-heading" style={{ textTransform: 'none' }}>Bienvenido a IPSST Móvil</h2>
            <button onClick={this.login} className="btn btn-lg btn-primary btn-block">Iniciar Sesión</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
