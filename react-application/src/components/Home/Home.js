import React, { Component } from 'react';
import MainMenu from '../MainMenu/MainMenu';
import DataManager from '../DataManager/DataManager';
import Gallery from '../Gallery/Gallery';

class Home extends Component {
  constructor(props) {
    super(props);
    DataManager.getInstance().loadHomeSection(this);
    window.screen.orientation.lock('portrait');
  }

  render() {
    const { unread_count: unreadCount } = this.state;
    return (
      <div className="page lobby index backgrounded">

        <Gallery />
        <div className="container">
          <MainMenu unreadCount={unreadCount} />
        </div>
      </div>
    );
  }
}

export default Home;
