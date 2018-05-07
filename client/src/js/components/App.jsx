import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hot } from 'react-hot-loader';

import { Test, Icon } from '@components';
import { toggleHitStatus } from '@reducers/search/filter/actions';

class App extends Component {
  state = {
    iconName: 'eye',
  };

  handleToggleHitStatus = () => {
    const { toggleHitStatus, didHeHitHer } = this.props;
    toggleHitStatus(!didHeHitHer);
  };

  handleToggleIcon = () => {
    this.setState({ iconName: 'chat' });
  };

  render() {
    const { didHeHitHer } = this.props;
    const { iconName } = this.state;

    return (
      <div className="container">
        <Test />
        <Icon name={iconName} />
        <input
          type="button"
          className="btn btn-primary"
          value="Toggle hitt"
          onClick={this.handleToggleHitStatus}
        />
        <input
          type="button"
          className="btn btn-primary"
          value="Toggle icon"
          onClick={this.handleToggleIcon}
        />
        {didHeHitHer ? (
          <p>I did hit her :(</p>
        ) : (
          <p>I did not hit her, I did NOT!</p>
        )}
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => ({
    didHeHitHer: state.getIn(['search', 'filter', 'didHeHitHer']),
  }),
  { toggleHitStatus },
)(App);

export default hot(module)(ConnectedApp);
