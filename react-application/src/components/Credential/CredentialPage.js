import React, { Component } from 'react';
import DataManager from '../DataManager/DataManager';
import Credential from './Credential';

class CredentialPage extends Component {
  constructor(props) {
    super(props);
    DataManager.getInstance().loadHomeSection(this);
    this.getFamilySelected = this.getFamilySelected.bind(this);
    window.screen.orientation.unlock();
  }

  getFamilySelected = (event) => {
    DataManager.getInstance().pickUser(event.currentTarget.dataset.documento);
  }

  render() {
    const { currentImage, currentUser, familyGroup } = this.state;
    return (
      <div className="page credential">
        <h2 className="text-center">Credencial Digital</h2>
        <hr />
        <Credential
          number={currentUser.DocumentoMiembro}
          name={`${currentUser.NombreMiembro} ${currentUser.ApellidoMiembro}`}
          image={currentImage}
        />
        <hr />
        <div className="col-md-12 text-center">
          <div className="btn-group credential-users">
            <button type="button" className="btn btn-secondary dropdown-toggle select-family btn-block" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Grupo Familiar
            </button>
            <div className="dropdown-menu family-group">
              {familyGroup.map(({
                DocumentoMiembro, NombreMiembro, ApellidoMiembro, ParentescoMiembro,
              }) => (
                <button className="dropdown-item" data-documento={DocumentoMiembro} onClick={this.getFamilySelected} type="button">{NombreMiembro} {ApellidoMiembro} ({ParentescoMiembro})</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CredentialPage;
