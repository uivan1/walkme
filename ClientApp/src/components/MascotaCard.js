import React, { useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Colors,Label,Icon } from 'react-foundation';
export default function MascotaCard ({vistaModal,onDeleteData,mascotaId,nombre,raza,comentario,foto,dueñoId,pagado,aprobado,accion,tipo}) {
  const data = localStorage.getItem('Usuario');
  const user=JSON.parse(data);
  const[edit,setEdit]=useState(false);
const FuncDelete=(mascotaId)=>{
  if (!window.confirm("Deseas borrar la mascota con id: " + mascotaId))
    return;
  else
  {
    axios.delete('mascota/'+mascotaId).then((response)=>{
      if(response.status===200){
          if(response.data===1){
              alert("Mascota eliminada");
              onDeleteData(mascotaId);
          }
      }
  }).catch(function (error) {
      console.log(error);
  })
  }
}

    return (
      <div className="row" key={mascotaId}>
        {edit?<Redirect to={'Mascota/'+mascotaId} />:null}
                <div className="small-12 columns">
                    <div className="box-item">
                        <div className="row align-middle">
                            <div className="shrink columns">
                                <div style={{width: '55px', height: '55px', borderRadius: '50%', background: 'blue'}}>
                                  <img style={{width: '55px', height: '55px', borderRadius: '50%', background: 'blue'}} src={foto} alt={foto}/>
                                </div>
                            </div>
                            <div className="auto columns">
                                <p className="margin-0 name-pet">{nombre}</p>
                                <p className="margin-0 text-race">{raza}</p>
                                <p className="margin-0 text-gender">{comentario}</p>
                            </div>
                            {/* Si es tipo de usuario dueño(2) y es dueño de las mascotas */}
                            {user.tipoUsuario===2 && dueñoId===user.id && vistaModal===false?
                            <div style={{textAlign: 'center',display: 'grid'}}> 
                              <Label color={Colors.WARNING} onClick={setEdit}><Icon name="fi-widget"/> Editar</Label>
                            <br/>
                              <Label color={Colors.ALERT} onClick={()=>FuncDelete(mascotaId)}><Icon name="fi-x"/> Eliminar</Label>        
                            </div>:null}
                            {/* Si es la vista del modal y es tipo de usuario paseador(1) */}
                            {vistaModal===true && user.tipoUsuario===1?<React.Fragment>
                            <td>
                              {pagado?'Pagado':'No pagado'}
                            </td>
                            <td>
                              {aprobado?<Label color={Colors.ALERT} onClick={()=>accion()}><Icon name="fi-x"/> Eliminar</Label> :<Label onClick={()=>accion()} color={Colors.SUCCESS}><Icon name="fi-check"/>Aprobar</Label>}
                            </td>
                            </React.Fragment>:null}
                            {/* Si es la vista del modal usuario Dueño y tipo tus mascotas (1) */}
                              {vistaModal===true && user.tipoUsuario===2 && tipo===1?
                              <Label onClick={()=>accion()} color={Colors.SUCCESS}><Icon name="fi-check"/>Agregar a paseo</Label>:null
                              }
                              {/*  Si es dueño del perro y esta en la vista del modal tipo mascotas en el paseop */}
                              {vistaModal===true && user.tipoUsuario===2 && tipo===0 && dueñoId===user.id?
                                <Label onClick={()=>accion()} color={Colors.ALERT}><Icon name="fi-x"/>Eliminar mascota</Label>:null
                              }
                        </div>
                    </div>
                </div>
            </div>
      
      // <tr key={mascotaId}>
      //   {edit?<Redirect to={'Mascota/'+mascotaId} />:null}
      //   <td >{nombre}</td>
      //   <td >{raza}</td>
      //   <td >{comentario}</td>
      //   <td >{foto}</td>
      //   {/* Si es tipo de usuario dueño(2) y es dueño de las mascotas */}
      //   {user.tipoUsuario===2 && dueñoId===user.id && vistaModal===false?
      //   <td >
      //       <a className="action" onClick={FuncEdit.bind(this)}>Edit</a>|
      //       <a className="action" onClick={()=>FuncDelete(mascotaId)}>Delete</a>
      //   </td>:null
      //   }
      //   {/* Si es la vista del modal y es tipo de usuario paseador(1) */}
      //   {vistaModal===true && user.tipoUsuario===1?<React.Fragment>
      //   <td>
      //     {pagado?'Pagado':'No pagado'}
      //   </td>
      //   <td>
      //     {aprobado?<Button color={Colors.ALERT} onClick={()=>accion()}>Rechazar</Button>:<Button onClick={()=>accion()} color={Colors.SUCCESS}>Aprobar</Button>}
      //   </td>
      //   </React.Fragment>:null}
      //     {/* Si es la vista del modal usuario Dueño y tipo tus mascotas (1) */}
      //   {vistaModal===true && user.tipoUsuario===2 && tipo===1?
      //   <Button onClick={()=>accion()} color={Colors.SUCCESS}>Agregar a paseo</Button>:null
      //   }
      //   {console.log()}
      //   {/*  Si es dueño del perro y esta en la vista del modal tipo mascotas en el paseop */}
      //   {vistaModal===true && user.tipoUsuario===2 && tipo===0 && dueñoId===user.id?
      //     <Button onClick={()=>accion()} color={Colors.ALERT}>Eliminar mascota</Button>:null
      //   }
      // </tr>
    );
  
}
