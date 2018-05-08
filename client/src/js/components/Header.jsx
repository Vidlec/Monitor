import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="row header mt-2">
        <h1 className="header__name">DASH</h1>
        <span className="header__version ml-3">v.0.1</span>
      </div>
    );
  }
}

export default Header;
