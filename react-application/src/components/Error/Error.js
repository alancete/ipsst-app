import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Error extends Component {
  constructor(props) {
    super(props);
    window.screen.orientation.lock('portrait');
  }

  render() {
    return (
      <div className="page login">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            <h2 className="alert-heading">¡Ha ocurrido un Error!</h2>
            <p>Ha ocurrido un problema con la autentificación del usuario ingresado.</p>
            <hr />
            <NavLink className="menu-link" to="/">
              <button type="button" className="btn btn-primary">Por favor intente nuevamente</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
