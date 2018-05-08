import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Alert extends Component {
  static propTypes = {
    alert: propTypes.object.isRequired,
  };

  render() {
    const { alert } = this.props;

    return (
      <div className="row">
        <div>{`Server: ${alert.get('server')}`}</div>
        <div>{`IP: ${alert.get('ip')}`}</div>
        <div>{`Message: ${alert.get('message')}`}</div>
        <div>{`Severity: ${alert.get('severity')}`}</div>
      </div>
    );
  }
}
