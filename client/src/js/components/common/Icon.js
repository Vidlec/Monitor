import React, { Component } from 'react';

class Icon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: require(`../../../gfx/svg/${props.name}.svg`).default,
    };
  }
  render() {
    const { icon: Icon } = this.state;
    return (
      <Icon className={`icon ${this.props.name}`} />
    );
  }
}

export default Icon;
