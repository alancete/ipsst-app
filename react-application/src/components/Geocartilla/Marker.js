import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerImage from '../../images/marker.svg';

const markerStyle = { backgroundImage: `url(${MarkerImage})` };

class Marker extends Component {
  constructor(props) {
    super(props);

    const { currentVisible } = this.props;
    this.state = {
      currentVisible,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentVisible } = this.state;
    if (currentVisible !== nextProps.currentVisible) {
      this.setState({
        currentVisible: nextProps.currentVisible,
      });
    }
  }

  clickMarker() {
    const {
      changeCenter, id, lat, lng,
    } = this.props;
    changeCenter(id, lat, lng);
  }

  render() {
    const { className, name, data } = this.props;
    const { currentVisible } = this.state;
    return (
      <div className={className} style={markerStyle} onClick={this.clickMarker.bind(this)}>
        {currentVisible && <span><h4>{name}</h4>{data.direccion}<br />{data.barrio}<br /><a href={`tel:+54-${data.telefono}`}>{data.telefono}</a></span>}
      </div>
    );
  }
}

Marker.propTypes = {
  className: PropTypes.string,
  lat: PropTypes.string,
  lng: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
  changeCenter: PropTypes.func,
  currentVisible: PropTypes.bool,
  data: PropTypes.shape({}),
};

Marker.defaultProps = {
  className: '',
  lat: '',
  lng: '',
  name: '',
  id: 0,
  changeCenter: () => {},
  currentVisible: false,
  data: {},
};

export default Marker;
