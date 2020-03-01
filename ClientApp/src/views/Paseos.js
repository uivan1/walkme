import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Colors } from 'react-foundation';
import PaseoCard from '../components/PaseoCard'
import ModalMapa from '../components/ModalMapa'
import axios from 'axios';

export default class Paseos extends Component{
    constructor(props) {
      super(props);
      const data = localStorage.getItem('Usuario');
      this.state = { 
          paseos: [],
          loading: true,
          user: JSON.parse(data),
          showMapa:false,
          mapaData:[],
          newData:[]
       };
       this.changeLoad=this.changeLoad.bind(this);
    }
    componentDidMount() {
        this.getPaseos();
      }
    
    async getPaseos() {
        // console.log(tipoUsuario);
        // const response = await fetch('paseo');
        // const data = await response.json();
        // console.log(data);
        // this.setState({ paseos: data, loading: false });
        axios.post('paseo/Info',this.state.user).then((response)=>{
          if(response.status===200){
              if(response.data.length>0){
                  console.log(response.data)
                  this.setState({ paseos: response.data, loading: false })
              }
          }
      }).catch(function (error) {
          console.log(error);
      })    

      }
      onDeleteData=deletePaseoId=>{
        const {paseos}=this.state;
        this.setState(
            {
                paseos: paseos.filter((mas) => {
                    return (mas.paseoId != deletePaseoId);
                })
            });
    }
    changeLoad(){
        this.setState({loading: true});
    }
    onUpdateData=(PaseoId,estado,mensaje)=>{
        console.log("onUpdateData",PaseoId,mensaje);
        const {paseos}=this.state;
        var paseosTemp=paseos;
        const delegated = (element) => element.paseoId == PaseoId;
        var index=paseos.findIndex(delegated);
        paseosTemp[index].estado=estado;
        paseosTemp[index].estadoPaseo=mensaje;
        this.setState({paseos:paseosTemp,loading:false})
    }
    
    renderTablaPaseos(paseos) {
        console.log("paseos",paseos);
        return <table className='table'>
            <thead>
                <tr>
                    <th>Origen</th>
                    <th>Vuelta</th>
                    <th>Distancia</th>
                    <th>Duración aproximada</th>
                    <th>Acción</th>
                    <th>Precio</th>
                    <th>Estado de paseo</th>
                    <th>Cupo</th>
                    <th>Nombre de paseador</th>
                    <th>Inicio de paseo</th>
                    <th>Fin de paseo</th>
                </tr>
            </thead>
            <tbody>
            {/* <Ubicación/> */}
                {paseos.map(item =><PaseoCard onDeleteData={this.onDeleteData} showMapa={this.statusShowMapa} {...item} paseoId={item.paseoId} precio={item.precio} 
                estado={item.estado} cupo={item.cupo} paseador={item.paseador.nombre}/>
                )}
            </tbody>
        </table>;
        
    }
    statusShowMapa=(data,newData)=>{
        console.log("DATA",newData)
      this.setState({ showMapa:!this.state.showMapa,mapaData:data,newData:newData});
    }
    renderPaseos(paseos){
        return(
            <React.Fragment>
                {paseos.map(item =><PaseoCard onDeleteData={this.onDeleteData} showMapa={this.statusShowMapa} data={item} paseoId={item.paseoId} precio={item.precio} 
                estado={item.estado} cupo={item.cupo} paseador={item.paseador.nombre}/>
                )}
            </React.Fragment>
        );
    }
    render(){
      let contenido = this.state.loading
            ?<p><em>Loading...</em></p>
            :this.renderPaseos(this.state.paseos);
        return(
            <section class="padding-vertical-1">
            <div class="row">
                <div class="small-12 columns" style={{display: 'inline-grid'}}>
                    <h1 class="title">Paseos</h1>
                    {this.state.user.tipoUsuario==1?
                    <Button color={Colors.SUCCESS}>
                    <Link to="/App/AddPaseo" style={{color:"white"}}>Crear paseo</Link>
                    </Button>:null}
                </div>
            </div>
            <div>
            {contenido}
            <ModalMapa newData={this.state.newData} changeLoad={this.changeLoad} onUpdateData={this.onUpdateData} status={this.state.showMapa} data={this.state.mapaData} showMapa={this.statusShowMapa}/>
          </div>
            
        </section>
        
        );
    }
}