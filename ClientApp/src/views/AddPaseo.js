import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router';
import DatePicker from "react-datepicker";
import { registerLocale, setHours,setMinutes } from  "react-datepicker";
import Map from "../components/Map"
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import t from 'typy';

registerLocale('es', es)

export default class AddPaseo extends Component{
    constructor(props){
        super(props);
        var paseoId = this.props.match.params["id"];
        this.state = { renderDataMap:false,title: "", loading: true,  formPaseo: [],ruta:'Mascotas' };
        if (paseoId!=null) {
            axios.get('paseo/'+paseoId).then((response)=>{
                if(response.status===200){
                    var temp=response.data[0].fechaInicioPaseo;
                    response.data[0].fechaInicioPaseo=new Date(temp);
                    console.log("response",response);
                    this.setState({ 
                        title: "Editar",
                        loading: false,
                        formPaseo: response.data[0],
                        inicioViaje:response.data[0].inicioViaje,
                        destinoViaje:response.data[0].destinoViaje,
                        ruta:'../Paseos',
                        edit:true,
                    });
                }
            }).catch(function (error) {
                console.log(error);
            })
         
        }else{
            this.state = { 
                renderDataMap:false,
                title: "Crear Paseo",
                loading: false,
                edit:false,
                user: localStorage.getItem('Usuario'),
                formPaseo: {          
                    precio: '',
                    cupo:'',
                    fechaInicioPaseo:new Date(),
                    paseadorId:JSON.parse(localStorage.getItem('Usuario')).id,
                    inicioViaje:{
                        latitud:'',
                        longitud:'',
                    },
                    destinoViaje:{
                        latitud:'',
                        longitud:'',
                    }
                },
                redirect: false,
                ruta:'Paseos',
            };
        }
        this.FuncSave = this.FuncSave.bind(this);
        this.actualizarViaje = this.actualizarViaje.bind(this);
        this.uptadeFields=this.uptadeFields.bind(this)
    }

    actualizarViaje(tipo,objLatLong){
        var objfinal;
        if(this.state.edit){
            objfinal={
                ubicaciónId:tipo===0?this.state.formPaseo.inicioViaje.ubicaciónId:this.state.formPaseo.destinoViaje.ubicaciónId,
                latitud:String(objLatLong.latitud),
                longitud:String(objLatLong.longitud),
            };
        }else{
            objfinal=objLatLong;
        }
        // inicio
        if(tipo===0){
              console.log(objfinal);
              this.setState({inicioViaje:objfinal,renderDataMap:true})
        // destino
        }else{
              this.setState({destinoViaje:objfinal,renderDataMap:true})
        }
    }
    FuncSave(data) {
        console.log(this.state);
        if (this.state.formPaseo.paseoId) {
            axios.put('paseo/Editar',data).then((response)=>{
                console.log(response);
                if(response.status===200){
                    if(response.data===1){
                        alert("Paseo modificado");
                        this.setState({ redirect: true })
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        }else{
            axios.post('paseo/Crear',data).then((response)=>{
                if(response.status===200){
                    if(response.data===1){
                        alert("Paseo creado");
                        this.setState({ redirect: true })
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
 uptadeFields(setFieldValue){
    this.setState({
        renderDataMap:false
    }, () => {
        setFieldValue("inicioViaje", this.state.inicioViaje);
        setFieldValue("destinoViaje", this.state.destinoViaje);
    });

            
        }
    renderCreateForm() {
        const PaseoSchema=Yup.object({
          precio:Yup.number()
              .typeError("Este campo debe de ser un valor numérico")
              .min(50,'El precio mínimo es de 50$')
              .required('precio es un campo obligatorio'),
          cupo:Yup.number()
              .typeError("Este campo debe de ser un valor numérico")
              .moreThan(1,'El minimo de cupo permitido es 2')
              .required('cupo es un campo obligatorio'),
          fechaInicioPaseo:Yup.date()
              .typeError("Este campo debe de ser una fecha válida")
              .required('fecha de inicio paseo es un campo obligatorio'),
          inicioViaje:Yup.object({
            latitud: Yup.string().required(),
            longitud: Yup.string().required()
          }),
          destinoViaje:Yup.object({
            latitud: Yup.string().required(),
            longitud: Yup.string().required()
          }),

        });
       
        return(            
            <Formik
                initialValues={this.state.formPaseo }
                validationSchema={PaseoSchema}
                onSubmit={(values, { setSubmitting }) => {
                    this.FuncSave(values);
                    setSubmitting(false);
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        {errors.inicioViaje || errors.destinoViaje ? 
                            <div className="" style={{
                                color:'#dc3545',
                                fontSize: '80%',
                                width: '100%',
                                marginTop: '0.25rem'}}>{"La ruta del viaje es incorrecta"}</div> : null}  
                    {/* {errors.destinoViaje ? 
                            <div className="" style={{
                                color:'#dc3545',
                                fontSize: '80%',
                                width: '100%',
                                marginTop: '0.25rem'}}>{"El formato de la ubicación de destino no es válido"}</div> : null}  */}
                    <div className="form-group row ">
                        <label className=" control-label" htmlFor="precio">Precio</label>
                            <input
                                type="text"
                                name="precio"
                                className={`form-control ${
                                    touched.precio && errors.precio ? "is-invalid" : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.precio}
                            />
                            <ErrorMessage
                            component="div"
                            name="precio"
                            className="invalid-feedback"
                            />
                    </div>
                    <div className="form-group row ">
                        <label className=" control-label" htmlFor="cupo">Cupo</label>
                            <input
                                type="text"
                                name="cupo"
                                className={`form-control ${
                                    touched.cupo && errors.cupo ? "is-invalid" : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cupo}
                            />
                            <ErrorMessage
                                component="div"
                                name="cupo"
                                className="invalid-feedback"
                            />
                    </div>
                    <div className="form-group row">
                        <label className=" control-label" htmlFor="fechaInicioPaseo">Fecha de Inicio de Paseo</label>
                             <DatePicker
                                name="fechaInicioPaseo"
                                selected={values.fechaInicioPaseo}
                                className={errors.fechaInicioPaseo?'form-control is-invalid':null}
                                onChange={e=>setFieldValue("fechaInicioPaseo",e)}
                                
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                locale="es"
                            />
              
                            {this.state.renderDataMap?this.uptadeFields(setFieldValue):null}
                            {errors.fechaInicioPaseo ? 
                            <div style={{
                                color:'#dc3545',
                                fontSize: '80%',
                                width: '100%',
                                marginTop: '0.25rem'}}>{errors.fechaInicioPaseo}</div> : null}                              
                    </div>               
                    <div style={{marginTop: '15px'}} className="form-group row ">
                        <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                        >
                        {isSubmitting ? "Cargando..." : this.state.title}
                        </button>
                        <button
                        className="btn btn-danger btn-block"
                        onClick={()=>this.setState({ redirect: true })}
                        >Cancelar</button>
                    </div>
                    </form>
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
            <form onSubmit={this.FuncSave} >
            <h1>{this.state.title}</h1>
            <h3>Paseo</h3>
            <hr />
            <div className="col-md-4"> 
            {console.log(this.state.formPaseo)}   
            <div style={{height: '450px'}}>
                
            
            {this.state.edit?<Map
                google={this.props.google}
                center={{lat: 20.587033, lng: -100.389029}}
                height='300px'
                zoom={13}
                onUpdateLatLong={this.actualizarViaje}
                edit={true}
                inicioViaje={this.state.inicioViaje}
                destinoViaje={this.state.destinoViaje}
            />:<Map
                google={this.props.google}
                center={{lat: 20.587033, lng: -100.389029}}
                height='300px'
                zoom={13}
                onUpdateLatLong={this.actualizarViaje}
                edit={false}
            />}
            </div>
                    {contents}  
            </div>
            </form>
        </div>
        );
    }
}
