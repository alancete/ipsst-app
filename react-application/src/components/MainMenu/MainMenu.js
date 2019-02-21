import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotificationsIcon from '../../images/notification.svg';
import CredentialIcon from '../../images/credential.svg';
import GeomapIcon from '../../images/geocartilla.svg';

const MainMenu = props => (
  <ul className="boxes">
    <li>
      <NavLink className="menu-link" to="/credencial">
        <img src={CredentialIcon} className="img-responsive" alt="Credencial" />
        <span>Credencial</span>
      </NavLink>
    </li>
    <li>
      <NavLink className="menu-link badge-notification" data-badge={props.unreadCount || ''} to="/news">
        <img src={NotificationsIcon} className="img-responsive" alt="Notificaciones" />
        <span>Notificaciones</span>
      </NavLink>
    </li>
    <li>
      <NavLink className="menu-link" to="/waze">
        <img src={GeomapIcon} className="img-responsive" alt="Geocartilla" />
        <span>Geocartilla</span>
      </NavLink>
    </li>
  </ul>
);

MainMenu.MainMenu = {
  unreadCount: PropTypes.number,
};

MainMenu.MainMenu = {
  unreadCount: 0,
};


export default MainMenu;
