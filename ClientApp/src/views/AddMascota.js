import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router';
import { Colors,Label,Icon } from 'react-foundation';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NewModalAlerta from '../components/NewModalAlerta';
const overlayStyle = {
  'backgroundColor': 'rgba(33,10,10,.45)'
  };
  const cloudinaryKey= String(process.env.REACT_APP_CLOUDINARY_KEY)
  const cloudinaryName= String(process.env.REACT_APP_CLOUDINARY_NAME)


export default class AddMascota extends Component{
    
    constructor(props){
        super(props);
        var mascotaId = this.props.match.params["id"];
        this.state = { title: "", loading: true,  formMascota: [],ruta:'Mascotas' };
        if (mascotaId!=null) {
            axios.get('mascota/'+mascotaId).then((response)=>{
                if(response.status===200){
                    this.setState({ 
                        title: "Editar",
                        loading: false,
                        formMascota: response.data[0],
                        ruta:'../Mascotas',
                        edit:true
                    });
                }
            }).catch(function (error) {
                console.log(error);
            })
         
        }else{
            this.state = { 
                title: "Crear Mascota",
                loading: false,
                user: localStorage.getItem('Usuario'),
                foto:"",
                redirect: false,
                modalAlerta:false,
                tituloAlerta:"",
                mensajeAlerta:"",
                ruta:'Mascotas',
                selectedFile: null,
            };
        }
        this.FuncSave = this.FuncSave.bind(this);

    }
  
    chekUploadResult=(resultEvent)=>{
        if(resultEvent.event==='success'){
            console.log(resultEvent);
            
        }
    }

    FuncSave(data) {
        if (this.state.edit) {
            axios.put('mascota/Editar',data).then((response)=>{
                if(response.status===200){
                    if(response.data===1){
                        this.setState({ redirect: true })
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        }else{
            axios.post('mascota/Crear',data).then((response)=>{
                if(response.status===200){
                    if(response.data===1){
                        this.setState({
                          modalAlerta:true,
                          tituloAlerta:"Mascota Creada",
                          mensajeAlerta:"Tu mascota fue agregada correctamente"
                        })
                        
                        // this.setState({ redirect: true })
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
  
    renderCreateForm() {
       
        const MascotaSchema=Yup.object({
          nombre:Yup.string()
              .min(3,'nombre debe tener 3 caracteres o más')
              .required('nombre es un campo obligatorio'),
          raza:Yup.string()
              .min(3,'raza debe tener 3 caracteres o más')
              .required('raza es un campo obligatorio'),
          comentario:Yup.string()
              .min(3,'comentario debe tener 3 caracteres o más')
              .required('comentario es un campo obligatorio'),
          foto:Yup.string()
              .required('la foto es obligatoria'),
      });
        return(
            <Formik
                // enableReinitialize 
                initialValues={this.state.edit?
                  this.state.formMascota:
                  {nombre:"",raza:"",comentario:"",foto:this.state.foto,dueñoId:JSON.parse(localStorage.getItem('Usuario')).id}}
                  validationSchema={MascotaSchema}
                // validate={values => {
                //     let errors = {};
                //     if (values.nombre === "") {
                //       errors.nombre = "nombre es un campo obligatorio";
                //     } else if (values.nombre.length < 3) {
                //       errors.nombre = "nombre debe tener 3 caracteres o más";
                //     }
                //     if (values.raza === "") {
                //       errors.raza = "nombre es un campo obligatorio";
                //     } else if (values.raza.length < 3) {
                //       errors.raza = "raza debe tener 3 caracteres o más";
                //     }
                //     if (values.comentario === "") {
                //         errors.comentario = "comentario es un campo obligatorio";
                //       } else if (values.comentario.length < 3) {
                //         errors.comentario = "raza debe tener 3 caracteres o más";
                //       }
                //     if (values.foto === "") {
                //       errors.foto = "la foto es obligatoria";
                //     }
                //     return errors;
                //   }}
                  onSubmit={values=>this.FuncSave(values)}
            >
                {({ setFieldValue,touched,values, errors, isSubmitting }) => (
                <Form>
        
                  <div className="form-group row col-md-12">
                    <label className="control-label" htmlFor="Nombre">Nombre</label>
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Ingresa el nombre"
                      className={`form-control ${
                        touched.nombre && errors.nombre ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="nombre"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group row col-md-12">
                    <label htmlFor="raza" className="control-label">Raza</label>
                    <Field
                      type="text"
                      name="raza"
                      placeholder="Ingresa la raza"
                      className={`form-control ${
                        touched.raza && errors.raza ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="raza"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group row col-md-12">
                    <label htmlFor="comentario" className="control-label">Comentario</label>
                    <Field
                      type="text"
                      name="comentario"
                      placeholder="Ingresa cometario"
                      className={`form-control ${
                        touched.comentario && errors.comentario ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="comentario"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group row col-md-12">
                    <label className="control-label" htmlFor="Foto" >Foto</label>
                    <div className="col-md-4">
                    {/* <Field
                      type="button"
                      value="Agregar Foto"
                      color={this.state.foto===''?
                            Colors.SUCCESS:
                            Colors.WARNING} 
                      className={`form-control ${
                        errors.foto ? "is-invalid" : ""
                      }`}
                      onClick={e => {
                        let widget=window.cloudinary.createUploadWidget({
                          cloudName:cloudinaryName,
                          api_key:keyCloudinary,
                          uploadPreset:"ml_default"},
                      (error,result)=>{result.event==='success'?(
                        setFieldValue("foto", result.info.secure_url)
                      )
                      :console.log()})
                      widget.open();
                      }}
                    /> */}
                        <Label 
                          color={values.foto==''?
                            Colors.SUCCESS:
                            Colors.WARNING} 
                            onClick={() => {
                              let widget=window.cloudinary.createUploadWidget({
                                cloudName:cloudinaryName,
                                api_key:cloudinaryKey,
                                uploadPreset:"ml_default"},
                            (error,result)=>{result.event==='success'?(
                              setFieldValue("foto", result.info.secure_url)
                            )
                            :console.log()})
                            widget.open();
                            }} >
                            <Icon name="fi-camera"/>
                            {values.foto===''?' Agregar foto':' Cambiar Foto'}
                          </Label>
                          
                    </div>
                    <input type="hidden" className={`form-control ${
                              touched.foto && errors.foto ? "is-invalid" : ""
                            }`} />
                    <ErrorMessage
                      component="div"
                      name="foto"
                      className="invalid-feedback"
                    />
                    </div>
                  <div className="form-group row col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Cargando..." : "Crear"}
                    </button>
                    <button
                        className="btn btn-danger btn-block"
                        onClick={()=>this.setState({ redirect: true })}
                        >Cancelar</button>
                  </div>
                </Form>
              )}
            </Formik>
        );
    }
    render(){
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
       return(
        <div className="col-md-12">
            {this.state.redirect?<Redirect to={this.state.ruta}/>:null}
            <h1>{this.state.title}</h1>
            <h3>Mascota</h3>
            <hr />
            {contents}
            {this.state.modalAlerta?<NewModalAlerta 
              open={this.state.modalAlerta}
              closeModal={this.props.showMapa}
              isModal={true}
              size="large"
              overlayStyle={overlayStyle} >
          <h1>{this.state.tituloAlerta}</h1>
            <p className="lead">{this.state.mensajeAlerta}</p>
            <br>
            </br>
            <button
                        className="btn btn-primary btn-block"
                        onClick={()=>this.setState({ redirect: true })}
                        >Aceptar</button>
          </NewModalAlerta>:null}
          
        </div>
        
        );
    }
}