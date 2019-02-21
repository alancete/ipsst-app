import React, { Component } from 'react';
import DataManager from '../DataManager/DataManager';

class AccountStatus extends Component {
  constructor(props) {
    super(props);
    DataManager.getInstance().loadPaymentsSection(this);
  }

  render() {
    const { pastPayments } = this.state;

    return (
      <div className="page copagos">
        <div className="container">
          <h2>Estado de Cuenta</h2>
          <hr />
          <ul className="list-group list-copagos">
            {pastPayments.map(({
              Mes, Anio, Estado, Saldo,
            }) => (
              <li className="list-group-item list-group-item-action">
                <h4>Período: {Mes}-{Anio}</h4>
                Importe: <strong>${Saldo}</strong><br />
                <small>Estado: {Estado}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}


export default AccountStatus;
