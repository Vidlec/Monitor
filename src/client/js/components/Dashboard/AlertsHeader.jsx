import React, { Component } from 'react';

export default class Alert extends Component {
  render() {
    return (
      <div className="row alert__header">
        <div className="col-1">severity</div>
        <div className="col-2">Server</div>
        <div className="col-2">ip</div>
        <div className="col-6">message</div>
        <div className="col-1">delete</div>
      </div>
    );
  }
}
