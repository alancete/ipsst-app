import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import DataManager from '../DataManager/DataManager';
import Marker from './Marker';

class GoogleMap extends Component {
  state = {
    currentVisible: null,
  }

  constructor(props) {
    super(props);
    this.changeCenter = this.changeCenter.bind(this);
    this.clickItem = this.clickItem.bind(this);

    DataManager.getInstance().loadPaymentsSection(this);
    DataManager.getInstance().storeProp('center', {
      lat: -31.637884,
      lng: -60.708970,
    });
    DataManager.getInstance().storeProp('currentVisible', null);
  }

  changeCenter = (id, lat, lng) => {
    this.setState({
      currentVisible: true,
    });
    DataManager.getInstance().storeProp('center', {
      lat,
      lng,
    });
  };

  changeCurrentVisible(id) {
    this.setState(
      {
        currentVisible: id,
      },
    );
  }

  clickItem(event) {
    document.getElementById('nav-home-tab').click();

    const { dataset } = event.currentTarget;
    this.changeCenter(dataset.id, dataset.lat, dataset.lng);
  }


  render() {
    const { zoom } = this.props;
    const { center, geocartilla, currentVisible } = this.state;

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAfspW-HVPwv4vKWMhIRFGODWflGbvt5vA' }}
        center={center}
        defaultZoom={zoom}
      >
        {geocartilla.ListaPrestador.map(({ consultorios, nombre }) => (
          <Marker
            lat={consultorios[0].geolocalizacion.latitud}
            lng={consultorios[0].geolocalizacion.longitud}
            name={nombre}
            className="marker"
            id={consultorios[0].id}
            changeCenter={this.changeCenter}
            currentVisible={currentVisible === consultorios[0].id}
            changeCurrentVisible={this.changeCurrentVisible}
          />
        ))}
      </GoogleMapReact>
    );
  }
}

GoogleMap.propTypes = {
  zoom: PropTypes.number,
};

GoogleMap.defaultProps = {
  zoom: 15,
};

export default GoogleMap;
