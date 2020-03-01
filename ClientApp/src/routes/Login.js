import React,{useState} from 'react';
import './login.css';
import axios from 'axios';
import { ButtonGroup } from 'react-foundation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import t from 'typy';
const Login =()=>{
    const [loggin,setLoggin]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
  
    const formik = useFormik({
    initialValues: {
      user: '',
      password:''
    },
    validationSchema:Yup.object({
        password:Yup.string()
            .min(6,'Debe tener 6 caracteres o más')
            .required('Este campo es obligatorio'),
        user:Yup.string()
            .email('Dirección de correo electrónico incorrecto')
            .required('Este campo es obligatorio'),
    }),
    onSubmit: values => {
       setIsSubmitting(true);
       login(values);
    },
    });
    
    const login = async (values) => {
            const data = {
                correo: values.user,
                contraseña:values.password,
              };
            const response = await axios.post('usuario',data);
            if(response.data.length===0){
                alert("Datos incorrectos");
                setIsSubmitting(false);
            }else{
                if(t(response.data).isArray){
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('UsuarioId', response.data[0].id);
                    localStorage.setItem('Usuario', JSON.stringify(response.data[0]));
                    setLoggin(true);
                    window.location.reload();
                }
            }
      };
   
        return(        
            <section className="padding-vertical-1 b-green height-100">
            <div className="row align-middle height-100">
                <form onSubmit={formik.handleSubmit}>
                <div className="small-12 columns">
                    <div className="row">
                        <div className="small-12 columns" ><img src="logo.png" alt="logo"/></div>
                    </div>
                    <p className="margin-0 text-center">Iniciar sesión</p>
                    <input 
                        id="user"
                        className={formik.errors.user && formik.touched.user?'form-control is-invalid':null}
                        type="email" 
                        value={formik.values.user} 
                        placeholder="Ingresa correo: example@walkme.com" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.user && formik.touched.user ? <div className="invalid-feedback">{formik.errors.user}</div> : null}
                    <input 
                        id="password"
                        className={formik.errors.password && formik.touched.password?'form-control is-invalid':null}
                        type="password" 
                        value={formik.values.password} 
                        placeholder="Ingresa contraseña" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}/>
                    {formik.errors.password && formik.touched.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null}
                    <ButtonGroup isExpanded>
                        <button 
                            className="button" 
                            type="submit"
                            disabled={isSubmitting}>{isSubmitting ? "Cargando..." : "Entrar"}</button>
                    </ButtonGroup>
                </div>
                </form>
            </div>
            </section>
        );
    
}
export default Login;