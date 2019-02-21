import React, { Component } from 'react';
import DataManager from '../DataManager/DataManager';

class Copagos extends Component {
  constructor(props) {
    super(props);
    DataManager.getInstance().loadPaymentsSection(this);
  }

  render() {
    const { copagos } = this.state;

    return (
      <div className="page copagos">
        <div className="container">
          <h3>Consumos</h3>
          <hr />
          <div className="list-group news">
            {copagos.map(({ Practica, FechaPrestacion, CantPrestaciones }) => (
              <li className="list-group-item list-group-item-action"><b>{FechaPrestacion}</b><br />
                <h4>{Practica}</h4>
                <small>Cantidad: {CantPrestaciones}</small><br />
              </li>
            ))}
          </div>
        </div>
      </div>
    );
  }
}


export default Copagos;
