import React, { Component, useState,useEffect } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import Ubicación from '../components/Ubicación'
import { Button,Label,Colors,Icon } from 'react-foundation';
import { compose, withProps } from "recompose";
import { G_API_URL } from "./constants";
import {  format } from 'date-fns'

const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");
function PaseosCard(props){
  const[data,setData]=useState(props.data);
  const [user]=useState(JSON.parse(localStorage.getItem('Usuario')));
  const [loading,setLoading]=useState(false);
  const [edit,setEdit]=useState(false);
  const [newData,setNewData]=useState([]);

  useEffect((newProps)=>{
    const startLoc = props.data.inicioViaje.latitud + ", " + props.data.inicioViaje.longitud ;
    const destinationLoc = props.data.destinoViaje.latitud + ", " + props.data.destinoViaje.longitud ;
    getInfo(startLoc,destinationLoc);

    // if(data !== newProps.data) {
    //   setData(newProps.data);
    // }
  })

const FuncEdit = () => {
  setEdit(true);
}
const FuncDelete=(paseoId)=>{
  if (!window.confirm("Deseas borrar el paseo con id: " + paseoId))
    return;
  else
  {
    axios.delete('paseo/'+paseoId).then((response)=>{
      console.log(response);
      if(response.status===200){
          if(response.data===1){
              alert("Paseo eliminado");
              props.onDeleteData(paseoId);
          }
      }
  }).catch(function (error) {
      console.log(error);
  })
  }
}

const getInfo=async(startLoc, destinationLoc)=>{
  const directionService = new window.google.maps.DirectionsService();
  directionService.route(
    {
      origin: startLoc,
      destination: destinationLoc,
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.WALKING
    },
    (result, status) => {
      console.log("status", status);
      console.log("result",result);
      if (status === window.google.maps.DirectionsStatus.OK) {
        console.log(result.routes[0].legs[0]);
        var temp=data;
        temp.newData=result.routes[0].legs[0];
        setData(temp);
        setNewData(result.routes[0].legs[0]);
        setLoading(true);
    
      } else {
        console.error(`error fetching directions ${result}`);
      }
    }
  );
}


  console.log(user);
 
    // const{newData}=this.state;
    return loading?
    <div class="row" key={data.paseoId}>
      {edit?<Redirect to={'Paseo/'+data.paseoId} />:null}
              <div class="small-12 columns">
                  <div class="box-item">
                      <div class="row align-middle">
                          <div class="auto columns">
                              <p class="margin-0 name-pet">Precio:{data.precio}</p>
                              <p class="margin-0 text-race">Cupo: {data.cupo}</p>
                              <p class="margin-0 text-race">Paseador: {data.paseador.nombre}</p>
                              <p class="margin-0 text-race">Estado: {data.estadoPaseo}</p>
                              <p class="margin-0 text-gender">Inicio: {format(new Date(data.fechaInicioPaseo), 'Pp')}</p>
                          </div>
                          <div class="auto columns">
                              <p class="margin-0 text-race">Inicia en</p>
                              <p class="margin-0 text-gender">{newData.start_address.substring(0, 15)+'...'}</p>
                              <p class="margin-0 text-race">Termina en</p>
                              <p class="margin-0 text-gender">{newData.end_address.substring(0, 15)+'...'}</p>
                          </div>
                          {/* Si es tipo de usuario dueño(1) y es propietario de los paseos */}
                         
                          <div style={{textAlign: 'center',display: 'grid'}}>
                          {user.tipoUsuario===1 && data.paseadorId===user.id?
                          <React.Fragment>
                          <tr>
                            <Label color={Colors.WARNING} onClick={FuncEdit}><Icon name="fi-widget"/> Editar</Label>
                          </tr><br/><tr>
                            <Label color={Colors.ALERT} onClick={()=>FuncDelete(data.paseoId)}><Icon name="fi-x"/> Eliminar</Label>        
                          </tr><br/></React.Fragment>:null}
                          <Label color={Colors.PRIMARY} onClick={()=>props.showMapa(data,newData)}><Icon name="fi-eye"/>Ver paseo</Label> 
                          </div>

                      </div>
                  </div>
              </div>
          </div>:
          <div><p>Loading</p></div>
  }
export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `330px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
)(PaseosCard);