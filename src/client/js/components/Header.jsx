import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="container-fluid header pt-3">
        <div className="container">
          <div className="row">
            <h1 className="header__name">DASH</h1>
            <span className="header__version ml-3">v.0.1</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
