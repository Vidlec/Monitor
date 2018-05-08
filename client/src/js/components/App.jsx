import React, { Component } from 'react';

import { Header, Icon, Dashboard } from '@components';

class App extends Component {
  state = {
    iconNames: ['eye', 'chat'],
  };

  render() {
    const { iconNames } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container-fluid">
          <div className="container section">
            <Dashboard />
            <Icon name={iconNames[0]} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
