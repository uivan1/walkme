import React, { Component } from 'react';
// import { Button, Colors } from 'react-foundation';
import { Route,Switch, Redirect } from 'react-router-dom';
import Views from '../views/Views';
import Error from './Error';
import { Layout } from '../components/Layout';
import { NavMenu } from '../components/NavMenu';

export default class Home extends Component{

      render () {
        return (
          <div>
            <NavMenu />
          <Switch>
                <Route exact path="/App" render={() => <Redirect to="/App/Mascotas" />} />
                <Route path="/App/Paseos" component={Views.Paseos} />
                <Route path="/App/Dueño" component={Views.Dueño} />
                <Route path="/App/Paseo/:id" component={Views.AddPaseo} />
                <Route path="/App/Mascotas" component={Views.Mascotas} />
                <Route path="/App/AddMascota" component={Views.AddMascota} />
                <Route path="/App/AddPaseo" component={Views.AddPaseo} />
                <Route path="/App/Mascota/:id" component={Views.AddMascota} />
                <Route component={Error} />
                {/* <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} /> */}
            
        </Switch>
        </div>
        );
      }
}