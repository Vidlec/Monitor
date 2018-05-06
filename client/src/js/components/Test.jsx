import React, { Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {
  render() {
    const { query } = this.props;

    return <div className="header">{query}</div>;
  }
}

export default connect(
  state => ({
    query: state.getIn(['search', 'query']),
  }),
  {},
)(Test);
