import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { Test, Icon } from '@components';
import { toggleHitStatus } from '@reducers/search/filter/actions';

class App extends Component {
  handleToggleHitStatus = () => {
    const { toggleHitStatus, didHeHitHer } = this.props;
    toggleHitStatus(!didHeHitHer);
  }

  render() {
    const { didHeHitHer } = this.props;

    return (
        <div className="container">
            <Test />
            <Icon name="eye" />
            <input
              type="button"
              className="btn btn-primary"
              value="Toggle hit"
              onClick={this.handleToggleHitStatus}
            />
            { didHeHitHer ? <p>I did hit her :(</p> : <p>I did not hit her, I did NOT!</p> }
        </div>
    );
  }
}

const HotApp = hot(module)(App);

export default connect(state => ({
  didHeHitHer: state.getIn(['search', 'filter', 'didHeHitHer']),
}), { toggleHitStatus })(HotApp);
