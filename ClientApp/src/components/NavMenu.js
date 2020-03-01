import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
    const data = localStorage.getItem('Usuario');
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      user:JSON.parse(data),
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
    window.location.reload();
  };

  render () {
    return (
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css"/>
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 top-bar" light>
          <Container>
            <NavbarBrand tag={Link} to="/">walkme</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {this.state.user.tipoUsuario!=1?
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Mascotas</NavLink>
                </NavItem>:null}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/App/Paseos">Paseos</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" onClick={this.logout} to="/">Cerrar sesión</NavLink>
                </NavItem>

                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem> */}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
