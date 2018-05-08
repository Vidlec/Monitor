import React, { Component } from 'react';
import propTypes from 'prop-types';

import { Icon } from '@components';

export default class Alert extends Component {
  static propTypes = {
    alert: propTypes.object.isRequired,
    onAlertRemove: propTypes.func,
  };

  handleAlertRemove = event => {
    event.preventDefault();
    const { onAlertRemove, alert } = this.props;
    if (onAlertRemove) onAlertRemove({ id: alert.get('id') });
  };

  render() {
    const { alert } = this.props;
    const isDeleting = alert.getIn(['status', 'isDeleting']);
    const className = isDeleting ? 'row alert alert--deleting' : 'row alert';

    return (
      <div className={className}>
        <div className="col-2">{alert.get('server')}</div>
        <div className="col-2">{alert.get('ip')}</div>
        <div className="col-6">{alert.get('message')}</div>
        <div className="col-1">{alert.get('severity')}</div>
        <div className="col-1">
          <span onClick={this.handleAlertRemove}>
            <Icon name="close" className="alert__delete" />
          </span>
        </div>
      </div>
    );
  }
}
