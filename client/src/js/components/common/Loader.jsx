import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Loader extends Component {
  static propTypes = {
    treshold: propTypes.number,
  };

  constructor(props) {
    super(props);
    const { treshold } = props;

    if (treshold) this.createTimer(treshold);
    this.state = {
      shouldDisplay: treshold ? false : !treshold && false, // If there is treshold, dont display loader
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  createTimer = treshold => {
    this.timer = setTimeout(this.toggleShouldDisplay, treshold);
  };

  toggleShouldDisplay = () => {
    this.setState(({ shouldDisplay }) => ({
      shouldDisplay: !shouldDisplay,
    }));
  };

  render() {
    const { shouldDisplay } = this.state;
    if (shouldDisplay) return <div className="loader" />;
    return null;
  }
}
