import React, { Component } from 'react';

class Icon extends Component {
  state = {
    icon: null,
  }

  componentDidMount() {
    this.getIcon(this.props.name);
  }

  getIcon = (name) => {
    import(`../../../gfx/svg/${name}.svg`)
      .then(pkg => this.setState({ icon: pkg }));
  }

  render() {
    const { icon: Icon } = this.state;

    if (Icon) return <Icon.default className={`icon ${this.props.name}`} />;
    return null;
  }
}

export default Icon;
