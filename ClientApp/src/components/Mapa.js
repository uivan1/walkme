import React, { Component } from "react";
import { compose, withProps } from "recompose";
import Ruta from "./Ruta";
import { G_API_URL } from "./constants";
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");
class Mapa extends Component {
  state = {
    defaultZoom: 14,
    map: null,
    center: {
      lat: parseFloat(this.props.data.inicioViaje.latitud),
      lng: parseFloat(this.props.data.inicioViaje.longitud) 
    }
  };
  render() {
    return (
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        center={this.state.center}
        defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
      >
            <div>
            <Ruta
              key={'index'}
              index={'index' + 1}
            //   strokeColor={elem.strokeColor}
              from={{lat: this.props.data.inicioViaje.latitud,lng: this.props.data.inicioViaje.longitud}}
              to={{lat: this.props.data.destinoViaje.latitud,lng: this.props.data.destinoViaje.longitud}}
            />
            </div>
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `330px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Mapa);
