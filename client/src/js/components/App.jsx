import React, { Component } from 'react';

import { Header, Icon, Dashboard } from '@components';

class App extends Component {
  state = {
    iconNames: ['eye', 'chat'],
  };

  handleToggleHitStatus = () => {
    const { toggleHitStatus, didHeHitHer } = this.props;
    toggleHitStatus(!didHeHitHer);
  };

  render() {
    const { iconNames } = this.state;

    return (
      <div className="container">
        <Header />
        <Dashboard />
        <Icon name={iconNames[0]} />
      </div>
    );
  }
}

export default App;
