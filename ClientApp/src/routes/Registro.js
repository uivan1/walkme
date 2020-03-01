import React, { Component } from 'react';
import './login.css';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            password: '',
            // showModalAlert:'modal-Alert',
            // mensajeAlert:''
        };
    }
    
    isFieldEmpty = field => {
        if (field === '' || field === null || field === undefined) {
          return true;
        }
        return false;
    };
    login = async () => {
        const { user, password } = this.state;
        if (!this.isFieldEmpty(user) && !this.isFieldEmpty(password)) {
        //   const loginData = {
        //     userKey: user,
        //     password,
        //   };
            if(user==="admin@algo.com" && password==="qwerty5"){
                alert("login");
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user', user);
            }
        } else {
            // Modal
            alert("Campos vacíos");
        }
      };
    render(){
        const { user, password } = this.state;
        return(
            <form className="log-in-form">
                <h4 className="text-center">Log in with you email account</h4>
                <label htmlFor="">
                    Email
                    <input onChange={e => this.setState({ user: e.target.value })} type="email" placeholder="somebody@example.com"/>
                </label>
                <label>Password
                    <input onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Password"/>
                </label>
                <input type="checkbox"/><label >Show password</label>
                <p><input type="submit" onClick={this.login} className="button expanded" value="Log in"></input></p>
                <p className="text-center"><a href="#">Registrate</a></p>
            </form>
        );
    }
}