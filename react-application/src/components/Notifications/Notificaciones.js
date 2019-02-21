import React, { Component } from 'react';
import DataManager from '../DataManager/DataManager';

class Notificaciones extends Component {
  constructor(props) {
    super(props);
    DataManager.getInstance().loadNotificationsSection(this);
    window.screen.orientation.lock('portrait');
  }

  render() {
    const { notifications } = this.state;
    return (
      <div className="page notifications index">
        <h2>Notificaciones</h2>
        <div className="btn-group btn-group-toggle float-right notification-filters" data-toggle="buttons">
          <label className="btn btn-secondary active" htmlFor="news">
            <input type="radio" name="options" id="all" autoComplete="off" defaultChecked /> Todas
          </label>
          <label className="btn btn-secondary" htmlFor="notify">
            <input type="radio" name="options" id="notify" autoComplete="off" /> Personales
          </label>
        </div>
        <div className="row clearfix">
          <div className="col-12">
            <ul className="list-group news">
              {notifications.map(({
                title,
                body,
                date,
                callToAction,
                callToActionText,
              }) => (
                <li className="list-group-item list-group-item-action"><b>{date}</b><br />
                  <h4>{title}</h4>
                  <p>{body}</p>
                  {callToAction
                  && <a href={callToAction} className="btn btn-primary btn-sm">{callToActionText || 'Ver Más'}</a>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Notificaciones;
