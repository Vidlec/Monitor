import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeAlert } from '@reducers/dashboard/alerts/actions';

import { Alert, AlertsHeader } from '@components';

class Dashboard extends Component {
  static propTypes = {
    alerts: propTypes.object,
    removeAlert: propTypes.func,
  };

  handleAlertRemove = ({ id }) => {
    const { removeAlert } = this.props;
    removeAlert({ id });
  };

  render() {
    const { alerts } = this.props;
    const shouldDisplay = alerts.size > 0;

    return shouldDisplay ? (
      <div className="col-12 dashboard">
        <AlertsHeader />
        {alerts
          .valueSeq()
          .map(alert => (
            <Alert
              key={alert.get('id')}
              alert={alert}
              onAlertRemove={this.handleAlertRemove}
            />
          ))}
      </div>
    ) : (
      <p>No alerts :/</p>
    );
  }
}

export default connect(
  state => ({
    alerts: state.getIn(['dashboard', 'alerts']),
  }),
  { removeAlert },
)(Dashboard);
