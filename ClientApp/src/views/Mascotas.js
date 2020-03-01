import React, { Component } from 'react';
import { Button, Colors } from 'react-foundation';
import { Link } from 'react-router-dom';
import MascotaCard from '../components/MascotaCard'
import axios from 'axios';

export default class Mascotas extends Component{
    constructor(props) {
        super(props);
        const data = localStorage.getItem('Usuario');
        this.state = { 
            mascotas: [],
            loading: true,
            user: data,
         };
    }
    componentDidMount() {
        this.getMascotas();
      }
    
      onDeleteData=deleteMascotaId=>{
        const {mascotas}=this.state;
        this.setState(
            {
                mascotas: mascotas.filter((mas) => {
                    return (mas.mascotaId != deleteMascotaId);
                })
            });
    }
    
    async getMascotas() {
        const{user}=this.state;
        const response = await axios.post('mascota',user,{
            headers: {
        'Content-Type': 'application/json',
        }});
        // console.log(response);
        // console.log(response.data[0].mascotas);
        this.setState({ mascotas: response.data[0].mascotas, loading: false });
      }

    renderTablaMascotas(mascotas) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Raza</th>
                    <th>Comentario</th>
                    <th>Foto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {mascotas.map(item =><MascotaCard onDeleteData={this.onDeleteData} mascotaId={item.mascotaId} nombre={item.nombre} 
                raza={item.raza} comentario={item.comentario} foto={item.foto} dueñoId={item.dueñoId} vistaModal={false}/>
                )}
            </tbody>
        </table>;
    }
    renderMascotas(mascotas){
        return(
            <React.Fragment>
        {mascotas.map(item =><MascotaCard key={item.mascotaId} onDeleteData={this.onDeleteData} mascotaId={item.mascotaId} nombre={item.nombre} 
            raza={item.raza} comentario={item.comentario} foto={item.foto} dueñoId={item.dueñoId} vistaModal={false}/>
            )}
            </React.Fragment>
        );
    }

    render(){
        let contenido = this.state.loading
            ?<p><em>Loading...</em></p>
            :this.renderMascotas(this.state.mascotas);
        return(
            // <div>
            //     <h1>Lista de Mascotas</h1>
            //     <p>
            //         <Link to="/App/AddMascota">Create New</Link>
            //     </p>
            //     {contenido}
            // </div>
                <section className="padding-vertical-1">
            {/* <div class="row">
                <div class="small-12 columns">
                    <button class="button-place width-100 text-left gray margin-bottom-2">
                        <i class="fas fa-map-marker-alt black"></i>
                        ¿Dónde pasearemos?
                    </button>
                </div>
            </div> */}
            <div className="row">
                <div className="small-12 columns" style={{display: 'inline-grid'}}>
                    <h1 className="title">Mascotas</h1>
                    <Button color={Colors.SUCCESS}>
                    <Link to="/App/AddMascota" style={{color:"white"}}>Agregar Mascota</Link>
                    </Button>
                </div>
            </div>
            {contenido}
        </section>
        );
    }
    
}