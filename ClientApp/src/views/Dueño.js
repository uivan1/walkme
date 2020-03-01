import React, { Component } from 'react';
import { Button, Colors } from 'react-foundation';
import { Link } from 'react-router-dom';
import MascotaCard from '../components/MascotaCard'

export default class Dueño extends Component{
    constructor(props) {
        super(props);
        this.state = { mascotas: [], loading: true };
    }
    componentDidMount() {
        this.getMascotas();
      }
    
    async getMascotas() {
        const response = await fetch('mascota');
        const data = await response.json();
        this.setState({ mascotas: data, loading: false });
      }
    render(){
        let contenido = this.state.loading
            ?<p><em>Loading...</em></p>
            :this.renderTablaMascotas(this.state.mascotas);
        return(
            <div>
                <h1>Lista de Mascotas</h1>
                <p>
                    <Link to="/addMascota">Create New</Link>
                </p>
                {contenido}
            </div>
        );
    }

    renderTablaMascotas(mascotas) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Raza</th>
                    <th>Comentario</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody>
                {mascotas.map(item =><MascotaCard mascotaId={item.mascotaId} nombre={item.nombre} 
                raza={item.raza} comentario={item.comentario} foto={item.foto}/>
                )}
            </tbody>
        </table>;
    }
    
}