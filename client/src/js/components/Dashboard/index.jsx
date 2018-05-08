import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Alert } from '@components';

class Dashboard extends Component {
  render() {
    const { alerts } = this.props;

    return alerts
      .valueSeq()
      .map(alert => <Alert key={alert.get('id')} alert={alert} />);
  }
}

export default connect(
  state => ({
    alerts: state.getIn(['dashboard', 'alerts']),
  }),
  {},
)(Dashboard);
