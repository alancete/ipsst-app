/* eslint-disable no-undef */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DataManager from '../DataManager/DataManager';

class Debit extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);

    DataManager.getInstance().loadHomeSection(this);
  }

  closeModal = () => {
    document.getElementById('closeModal').click();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="page debit">
        <h2>Aceptación de débito en cuenta</h2>
        <hr />
        <h5><small>Apellido y Nombre: {currentUser.ApellidoMiembro} {currentUser.NombreMiembro}</small></h5>
        <h5><small>CUIT: {currentUser.DocumentoMiembro}</small></h5>
        <h5><small>CBU: 3300599525990078569015</small></h5>
        <div className="alert alert-light" role="alert">
          <p><a href="http://www.santafe.gov.ar/">Al aceptar el trámite usted acepta los términos y condiciones.</a></p>
        </div>
        <button type="button" className="btn btn-lg btn-block btn-secondary" data-toggle="modal" data-target="#exampleModal">Aceptar Débito en Cuenta</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Aceptación de débito en cuenta</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                El débito en cuenta fué realizado con éxito
              </div>
              <div className="modal-footer">
                <NavLink to="/" onClick={this.closeModal}><button data-dismiss="modal" id="closeModal" type="button" className="btn btn-primary">Aceptar</button></NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Debit;
