import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DataManager from '../DataManager/DataManager';

class Configuration extends Component {
  constructor(props) {
    super(props);
    DataManager.getInstance().loadPaymentsSection(this);
  }

  render() {
    return (
      <div className="page copagos">
        <div className="container">
          <h2>Gestión en Línea</h2>
          <hr />
          <br />
          <NavLink to="/debit"><button type="button" className="btn btn-block btn-sm btn-secondary">Adhesión a Débito en Cuenta</button></NavLink>
          <br />
          <NavLink to=""><button type="button" className="btn btn-block btn-sm btn-secondary">Deshaderirse a Débito en Cuenta</button></NavLink>
          <br />
          <NavLink to=""><button type="button" className="btn btn-block btn-sm btn-secondary">Convenio de Reciprosidad</button></NavLink>
        </div>
      </div>
    );
  }
}


export default Configuration;
