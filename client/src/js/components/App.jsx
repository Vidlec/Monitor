import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Test, Icon } from '@components';
import { toggleHitStatus } from '@reducers/search/filter/actions';

class App extends Component {
  state = {
    iconNames: ['eye', 'chat'],
  };

  handleToggleHitStatus = () => {
    const { toggleHitStatus, didHeHitHer } = this.props;
    toggleHitStatus(!didHeHitHer);
  };

  handleToggleIcon = () => {
    this.setState(({ iconNames }) => ({
      iconNames: iconNames.reverse(),
    }));
  };

  render() {
    const { didHeHitHer } = this.props;
    const { iconNames } = this.state;

    return (
      <div className="container">
        <Test />
        <Icon name={iconNames[0]} />
        <input
          type="button"
          className="btn btn-primary ml-4"
          value="Toggle hitt"
          onClick={this.handleToggleHitStatus}
        />
        <input
          type="button"
          className="btn btn-primary ml-4"
          value="Toggle icon"
          onClick={this.handleToggleIcon}
        />
        {didHeHitHer ? (
          <p>I did hit her :(</p>
        ) : (
          <p>I did not hit her, I did NOT!!</p>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    didHeHitHer: state.getIn(['search', 'filter', 'didHeHitHer']),
  }),
  { toggleHitStatus },
)(App);
