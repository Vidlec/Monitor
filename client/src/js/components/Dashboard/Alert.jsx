import React, { Component } from 'react';
import propTypes from 'prop-types';

import { Icon } from '@components';

export default class Alert extends Component {
  state = {
    shouldDisplayLoader: false,
  };

  static propTypes = {
    alert: propTypes.object.isRequired,
    onAlertRemove: propTypes.func,
  };

  componentWillUnmount() {
    clearTimeout(this.loaderTreshold);
  }

  measureSpinner = () => {
    this.loaderTreshold = setTimeout(this.toggleSpinner, 1000);
  };

  handleAlertRemove = event => {
    event.preventDefault();
    const { onAlertRemove, alert } = this.props;
    if (onAlertRemove) {
      onAlertRemove({ id: alert.get('id') });
      this.measureSpinner();
    }
  };

  toggleSpinner = () => {
    this.setState(({ shouldDisplayLoader }) => ({
      shouldDisplayLoader: !shouldDisplayLoader,
    }));
  };

  render() {
    const { alert } = this.props;
    const { shouldDisplayLoader } = this.state;

    const isDeleting = alert.getIn(['status', 'isDeleting']);
    const className = isDeleting ? 'row alert alert--deleting' : 'row alert';

    return (
      <div className={className}>
        {shouldDisplayLoader && <div className="spinner" />}
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
