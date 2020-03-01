import React, { Component } from 'react';
import Modal from 'react-foundation-modal';
import { Label,Button,Sizes,ButtonGroup, Colors,Grid,Cell } from 'react-foundation';
import Mapa from './Mapa';
import MascotaCard from './MascotaCard'
import ModalConfirmación from './ModalConfirmación'
import axios from 'axios';
import {  format } from 'date-fns'
const overlayStyle = {
    'backgroundColor': 'rgba(33,10,10,.45)'
    };
export default class ModalMapa extends Component{

    constructor(props){
        super(props);
        const data = localStorage.getItem('Usuario');
        this.state = {
            modalIsOpen: this.props.status,
            data:this.props.data,
            showMascotas:false,
            mascotas:[],
            misMascotas:[],
            idSelected:null,
            user: JSON.parse(data),
            // Parametros de modal
            modalQuestion: false,
            funciontrue:'',
            funcionfalse:'',
            txtTrue:'',
            txtFalse:'',
            titleModal:'',
            messageModal:'',
            // 
            newData:{}
        }
        this.handleMascotas=this.handleMascotas.bind(this);
        this.cambiarEstadoPaseo=this.cambiarEstadoPaseo.bind(this);
    }

    
    getMascotas() {
        // const{user}=this.state;
        // const response = await axios.post('mascota',user,{
        //     headers: {
        // 'Content-Type': 'application/json',
        // }});
        // this.setState({ misMascotas: response.data[0].mascotas });
        console.log("aqui2",this.props);
        console.log("aquix",this.state.user.id,this.state.data.paseoId);
        const data={
            Id:this.state.user.id,
            PaseoId:this.state.data.paseoId,
        }
      
        axios.post('mascota/infoCard',data,{
            headers: {
        'Content-Type': 'application/json',
        }}).then((response)=>{
            console.log(response);
            if(response.status===200){
                this.setState({ misMascotas: response.data });
            }
        }).catch(function (error) {
            console.log(error);
        });
      }

    componentWillReceiveProps(newProps){
        console.log("newProps",newProps.data);
        this.setState({
            modalIsOpen: newProps.status,
            data: newProps.data,
            newData:newProps.newData,
            showMascotas:false
        });
        // this.getMascotas();
    }
    showModalQuestion=(modal,idSelected,itemMascota)=>{
        var funciontrue,funcionfalse,txtTrue,txtFalse,titleModal,messageModal;
        switch (modal) {
            case 1:
                // modal 1 Modal de Agregar mascota a paseo
                funciontrue=()=>this.AgregarMascotaPaseo(true);
                funcionfalse=()=>this.AgregarMascotaPaseo(false);
                txtTrue='Pagar Ahora';
                txtFalse='Pagar al Finalizar';
                titleModal='Agregar mascota a paseo';
                messageModal='¿Deseas pagar el viaje por anticipado?';
            break;
            case 2:
                // modal 2 Modal de Eliminar mascota de paseo
                funciontrue=()=>this.BorrarMascotaPaseo();
                funcionfalse=()=>this.showModalQuestion();
                txtTrue='Eliminar mascota de paseo';
                txtFalse='Cancelar';
                titleModal='Eliminar mascota de paseo';
                messageModal='¿Deseas eliminar tu mascota de este paseo?';
            break;
            case 3:
                 // modal 3 Modal de Aprobar mascota
                 var a=itemMascota.aprobado;
                 funciontrue=()=>this.AprobarMascotaPaseo(!a,itemMascota.mascota);
                 funcionfalse=()=>this.showModalQuestion();
                //  Si esta aprobado
                 if(a){
                    txtTrue='Rechazar mascota';
                    txtFalse='Cancelar';
                    titleModal='Rechazar mascota en este paseo';
                    messageModal='¿Deseas rechazar esta mascota en el paseo?';
                 }else{
                    txtTrue='Aprobar mascota';
                    txtFalse='Cancelar';
                    titleModal='Aprobar mascota en este paseo';
                    messageModal='¿Deseas aprobar esta mascota en el paseo?';
                 }
                 
            break;
        }
        this.setState({
            modalQuestion:!this.state.modalQuestion,
            idSelected:idSelected,
            funciontrue:funciontrue,
            funcionfalse:funcionfalse,
            txtTrue:txtTrue,
            txtFalse:txtFalse,
            titleModal:titleModal,
            messageModal:messageModal,
        })
    }

    AgregarMascotaPaseo=(pagado)=>{
        // console.log("idMascota",this.state.idMascotaSelected);
        // console.log("idPaseo",this.props.data.paseoId);
        // console.log("pagado",pagado);
        var data={
            'MascotaId':this.state.idSelected,
            'PaseoId':this.props.data.paseoId,
            'Pagado':pagado,
            'Aprobado':false,
        }
        axios.post('paseomascota/Crear',data).then((response)=>{
            console.log(response);
            if(response.status===200){
                if(response.data===1){
                    alert("Mascota agregada a paseo");
                    //Extra redux or mobx
                    this.showModalQuestion();
                    this.props.showMapa()
                }else{
                    alert("Paseo lleno, no se completo acción");
                }
            }
        }).catch(function (error) {
            console.log(error);
        })    
    }
    AprobarMascotaPaseo=(aprobado,mascota)=>{
        console.log("AprobarMascotaPaseo",aprobado);
        var data={
            'PaseoMascotaId':this.state.idSelected,
            'PaseoId':this.props.data.paseoId,
            'Pagado': mascota.pagado,
            'MascotaId':mascota.mascotaId,
            'Aprobado':aprobado,
        }
        axios.put('paseomascota/aprobar',data).then((response)=>{
            console.log(response);
            if(response.status===200){
                if(response.data===1){
                    if(aprobado){
                        alert("Mascota aprobada");
                    }else{
                        alert("Mascota rechazada");
                    }
                    
                    this.showModalQuestion();
                    this.props.showMapa();
                }
            }
        }).catch(function (error) {
            console.log(error);
        })   
    }
    BorrarMascotaPaseo=()=>{
        axios.delete('paseomascota/'+this.state.idSelected).then((response)=>{
            if(response.status===200){
                if(response.data===1){
                    alert("Mascota eliminada de paseo");
                    // Extra
                    this.showModalQuestion();
                    this.props.showMapa()

                }
            }
        }).catch(function (error) {
            console.log(error);
        })    
    }
    
    
    handleMascotas(){
        if(!this.state.showMascotas){
            console.log("aqui handleMascotas");
            axios.get('paseomascota/'+this.state.data.paseoId).then((response)=>{
                console.log(response);
                if(response.status===200){
                    this.setState({ 
                        mascotas: response.data,
                        showMascotas: !this.state.showMascotas,
                    });
                }
            }).catch(function (error) {
                console.log(error);
            })
            this.getMascotas();
        }else{
            this.setState({
                showMascotas: !this.state.showMascotas,
            });
        }
        
    }
    renderTablaMascotas(mascotas,tipo) {
        return <div>
            {/* Tipo indica 0 muestra las mascotas en el paseo y tipo 1 lista de mis mascotas */}
    <h3>{tipo===0?'Mascotas en este paseo '+mascotas.length+'/'+this.state.data.cupo:'Tus mascotas'}</h3>
        <table className='table'>
            <tbody>
                {tipo===0?
                mascotas.map(item =><MascotaCard onDeleteData={this.onDeleteData} mascotaId={item.mascota.mascotaId} nombre={item.mascota.nombre} 
                raza={item.mascota.raza} dueñoId={item.mascota.dueñoId} comentario={item.mascota.comentario} foto={item.mascota.foto} tipo={0} pagado={item.pagado} aprobado={item.aprobado} vistaModal={true} accion={this.state.user.tipoUsuario==2?()=>this.showModalQuestion(2,item.paseoMascotaId):()=>this.showModalQuestion(3,item.paseoMascotaId,item)}/>
                ):
                mascotas.map(item =><MascotaCard onDeleteData={this.onDeleteData} mascotaId={item.mascotaId} nombre={item.nombre} 
                raza={item.raza} dueñoId={item.dueñoId} comentario={item.comentario} foto={item.foto} vistaModal={true} tipo={1} accion={()=>this.showModalQuestion(1,item.mascotaId)}/>
                )
                }
            </tbody>
        </table>
        </div>;
    }
    cambiarEstadoPaseo(tipo,mensaje){
        this.props.changeLoad();
        var tempData=this.state.data;
        tempData.estado=tipo;
        axios.put('paseo/Editar',tempData).then((response)=>{
            console.log(response);
            if(response.status===200){
                if(response.data===1){
                    alert("Estado de paseo modificado");
                    this.props.showMapa();
                    // Esto esta mal
                    // window.location.reload();
                    this.props.onUpdateData(tempData.paseoId,tipo,mensaje);

                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }
    renderMoreButtons(){
        var mensaje,color,botones;
        switch (this.state.data.estado) {
            case 0:
                mensaje="Creado";
                color=Colors.WARNING;
                botones=<Button onClick={()=>this.cambiarEstadoPaseo(5,"Cancelado")} color={Colors.ALERT}>Cancelar</Button>;
            break;
            case 1:
                mensaje="Lleno";
                color=Colors.ALERT;
                botones=
                <React.Fragment>
                    <Button color={Colors.SUCCESS} onClick={()=>this.cambiarEstadoPaseo(3,"Proceso")}>Iniciar</Button>
                    <Button color={Colors.ALERT} onClick={()=>this.cambiarEstadoPaseo(5,"Cancelado")}>Cancelar</Button>
                </React.Fragment>;
            break;
            case 2:
                mensaje="Disponible";
                color=Colors.SUCCESS;
                botones=<React.Fragment>
                <Button color={Colors.SUCCESS} onClick={()=>this.cambiarEstadoPaseo(3,"Proceso")}>Iniciar</Button>
                <Button color={Colors.ALERT} onClick={()=>this.cambiarEstadoPaseo(5,"Cancelado")}>Cancelar</Button>
            </React.Fragment>;
            break;
            case 3:
                mensaje="En proceso";
                color=Colors.ALERT;
                botones=<Button color={Colors.SUCCESS} onClick={()=>this.cambiarEstadoPaseo(4,"Finalizado")}>Finalizar</Button>;
            break;
            case 4:
                    mensaje="Finalizado";
                    color=Colors.WARNING;
            break;
            case 5:
                    mensaje="Cancelado";
                    color=Colors.ALERT;
            break;
    
        }
        return <div className="button-colors-example">
            <ButtonGroup>
        <Label color={color} style={{height:'25px',marginRight:'10px'}} size={Sizes.LARGE}>{mensaje}</Label>
        {botones}
        </ButtonGroup>
        </div>
    }

    render(){
        const {modalQuestion,funciontrue,funcionfalse,txtTrue,txtFalse,titleModal,messageModal}=this.state;
        return (
            <div>
                  <Modal 
                      open={this.state.modalIsOpen}
                      closeModal={this.props.showMapa}
                      isModal={true}
                      size="large"
                      overlayStyle={overlayStyle} >
                      {/* <h1>Awesome. I Have It.</h1>
                      <p className="lead">Your couch. It is mine.</p>
                      <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p> */}
                      <div style={{marginTop:'20px',width: '100%',height: '60vh',position:'relative'}}>
                          <div>
                              {this.state.showMascotas?
                              <React.Fragment>
                              {this.renderTablaMascotas(this.state.mascotas,0)}
                              {this.state.user.tipoUsuario===2?this.renderTablaMascotas(this.state.misMascotas,1):null}
                              </React.Fragment>:
                              <React.Fragment>
                              <Mapa data={this.state.data}/>
                              <Grid className="display">
                                <Cell small={6} large={4}>
                                <h1 class="subtitle">Inicia paseo</h1>
                                <p>{this.state.modalIsOpen?this.state.newData.start_address:null}</p>
                                <h2 className="subtitle">Paseador</h2>
                                <p>{this.state.modalIsOpen?this.state.data.paseador.nombre:null}</p>
                                </Cell>
                                <Cell small={6} large={4}>
                                <h1 class="subtitle">Termina paseo</h1>
                                <p>{this.state.modalIsOpen?this.state.newData.end_address:null}</p>
                                <h2 className="subtitle">Fecha y hora</h2>
                                <p>{this.state.modalIsOpen?format(new Date(this.state.data.fechaInicioPaseo), 'Pp'):null}</p>
                                </Cell>
                              </Grid>

                              </React.Fragment>
                              }
                          </div>
                          <div className="button-colors-example">
                          <button className="button" style={{marginTop:'10px'}} type="button" onClick={this.handleMascotas} >
                          {this.state.showMascotas?'Ver Mapa':'Ver Mascotas'}
                          </button>
                          {this.state.user.tipoUsuario===1 && !this.state.showMascotas && this.state.modalIsOpen?this.renderMoreButtons():null}
                          </div>
                      </div>
                  </Modal>

                  <ModalConfirmación functionTrue={funciontrue} btnTrue={txtTrue} 
                  functionFalse={funcionfalse} btnFalse={txtFalse} title={titleModal}
                    message={messageModal} close={()=>this.showModalQuestion()}
                    modalIsOpen={modalQuestion}></ModalConfirmación>

            </div>
          );
    }
}