/* gobal document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import DataManager from '../DataManager/DataManager';
import Marker from './Marker';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015

class Geocartilla extends Component {
  constructor(props) {
    super(props);
    this.changeCenter = this.changeCenter.bind(this);
    this.clickItem = this.clickItem.bind(this);
    
    DataManager.getInstance().loadGeoSection(this);
    DataManager.getInstance().storeProp('center', {
      lat: -31.637884,
      lng: -60.708970,
    });
    DataManager.getInstance().storeProp('currentVisible', null);
    window.screen.orientation.lock('portrait');
  }

  changeCenter = (id, lat, lng) => {
    this.changeCurrentVisible(id);
    DataManager.getInstance().storeProp('center', {
      lat: Number(lat),
      lng: Number(lng),
    });
  };

  // eslint-disable-next-line class-methods-use-this
  changeCurrentVisible(id) {
    DataManager.getInstance().storeProp('currentVisible', id);
  }

  clickItem(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    document.getElementById('nav-home-tab').click();
    const { dataset } = event.currentTarget;
    this.changeCenter(dataset.id, dataset.lat, dataset.lng);
  }

  render() {
    const { zoom } = this.props;
    const { center, geocartilla, currentVisible } = this.state;
    
    return (
      <div className="page geocartilla">
        <h2>Cartilla Médica</h2>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              Especialidad
              <Typeahead
                ref={(ref) => this._especialidadTypeahead = ref}
                onChange={(selected) => {
                  console.log(selected);
                  this._localidadTypeahead.getInstance().clear();
                  document.getElementById('nombre').value = null;
                  DataManager.getInstance()._geoManager.pickEspecialidad(selected[0]);
                }}
                options={geocartilla.especialidades}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              Localidad
              <Typeahead
                ref={(ref) => this._localidadTypeahead = ref}
                onChange={(selected) => {
                  console.log(selected);
                  document.getElementById('nombre').value = null;
                  DataManager.getInstance()._geoManager.pickLocalidad(selected[0]);
                }}
                options={geocartilla.localidades}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nombre">Prestadores
                <input id="nombre" className="form-control" type="text" onChange={(event) => {
                  console.log(event.currentTarget.value);
                  DataManager.getInstance()._geoManager.pickPrestador(event.currentTarget.value);
                }}/>
              </label>
            </div>
          </div>
        </div>

        <nav className="tabs-geocartilla">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-list" role="tab" aria-controls="nav-list" aria-selected="true">Lista</a>
            <a className="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-map" role="tab" aria-controls="nav-map" aria-selected="false">Mapa</a>
          </div>
        </nav>
        
        <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-list" role="tabpanel" aria-labelledby="nav-profile-tab">
            <ul className="list-group geomap">
              {geocartilla.prestadores.map(({ id, address, location, phone, name, lat, len }) => (
                <li className="list-group-item list-group-item-action">
                  <b>{name}</b><br />
                  {address} - {location}
                  <br />
                  Tel: <a href={`tel:+54-${phone}`}>{phone}</a><br />
                  <a className="btn btn-primary btn-sm" onClick={this.clickItem} data-id={id} data-lat={lat} data-lng={len}>Ver en Mapa</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-pane fade" id="nav-map" role="tabpanel" aria-labelledby="nav-home-tab">
            <div style={{ height: '400px', width: '100%' }} className="map-container">

              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAfspW-HVPwv4vKWMhIRFGODWflGbvt5vA' }}
                center={center}
                defaultZoom={zoom}
              >
                {geocartilla.prestadores.map(({ id, address, location, phone, name, lat, len }) => (
                  <Marker
                    lat={lat}
                    lng={len}
                    name={name}
                    data={{direccion: address, barrio: location, telefono: phone}}
                    className="marker"
                    id={id}
                    changeCenter={this.changeCenter}
                    currentVisible={currentVisible === id}
                  />
                ))}
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Geocartilla.propTypes = {
  zoom: PropTypes.number,
};

Geocartilla.defaultProps = {
  zoom: 15,
};

export default Geocartilla;
