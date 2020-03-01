import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
const key = process.env.REACT_APP_GOOGLE_MAPS

const mapStyles = {
    position:'relative',
    width: '100%',
    height: '100%',
  };
class Ubicación extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}}
      />
    );
  }
}
export default GoogleApiWrapper({
    apiKey: String(key)
  })(Ubicación);