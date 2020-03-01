import React, { Component } from 'react';

class Error extends Component {

  render() {
    return (
      <div>
        <h3>Error 404</h3>
        <h4>No se encontró la página</h4>
        <button onClick={this.goBack}>Regresar</button>
      </div>
    );
  }
}

export default Error;
