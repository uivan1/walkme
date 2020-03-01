import React, { Component } from 'react';
import { Switch,Route,Redirect } from 'react-router';
// import { Home } from './components/Home';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Routes from './routes/Routes';
/* global google */


import './custom.css'
import { createHashHistory } from 'history'
const history = createHashHistory()
export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    const data = localStorage.getItem('Usuario');
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      user: JSON.parse(data),
    };
  }
  renderRedirect(tipo){
    switch (tipo) {
      case 1:
        return <Redirect to="App/Paseos" />
      break;
      case 2:
        return <Redirect to="App/Mascotas" />
      break;
      default:
          return <Redirect to="App/Mascotas" />
        break;
    }
  }
  render () {
    const { isLoggedIn,user } = this.state;
    return (
      <Switch>
        <Route exact path='/' render={() => (isLoggedIn ?this.renderRedirect(user.tipoUsuario): <Routes.Login />)} />
        <Route path="/App" render={() => (isLoggedIn ? <Routes.Home /> : <Redirect to="/" />)} />
        {/* <Route path='/login' component={Login} /> */}
      </Switch>
    );
  }
}
