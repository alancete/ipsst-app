/* global document */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DataManager from '../DataManager/DataManager';
import logo from '../../images/logo.png';
import logoSantaFe from '../../images/santafelogo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    DataManager.getInstance().logout();
  }

  handleClick = () => {
    document.getElementById('burger').click();
    return true;
  }

  handleLogoClick = () => {
    document.getElementById('burger').checked = false;
  }

  render() {
    if (DataManager.getInstance().isLoggedIn()) {
      return (
        <div className="head-container">
          <header>
            <div className="container-fluid">
              <div className="row">
                <div className="main-menu">
                  <input id="burger" type="checkbox" />
                  <label htmlFor="burger">
                    <span />
                    <span />
                    <span />
                  </label>
                  <nav>
                    <ul>
                      <li onClick={this.handleClick}><NavLink className="menu-link" to="/credencial">Credencial</NavLink></li>
                      <li onClick={this.handleClick}><NavLink className="menu-link" to="/news">Notificaciones</NavLink></li>
                      <li onClick={this.handleClick}><NavLink className="menu-link" to="/waze">Geocartilla</NavLink></li>
                      <li onClick={this.handleClick}><a className="menu-link" href="#" onClick={this.handleLogout}>Cerrar Sesión</a></li>
                    </ul>
                  </nav>
                </div>
                <div className="col-12">
                  <NavLink className="navbar-brand" to="/">
                    <img alt="IAPOS" className="logo" src={logo} onClick={this.handleLogoClick} />
                  </NavLink>
                </div>
              </div>
            </div>
          </header>
        </div>
      );
    }
    return '';
  }
}

export default Header;
