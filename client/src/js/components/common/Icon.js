import React, { Component } from 'react';

class Icon extends Component {
  state = {
    Icon: null,
  };

  componentDidMount() {
    this.getIcon(this.props.name);
  }

  componentDidUpdate({ name: prevName }) {
    const { name } = this.props;
    if (prevName !== name) this.getIcon(name);
  }

  getIcon = name => {
    import(`../../../gfx/svg/${name}.svg`).then(Icon =>
      this.setState({ Icon }),
    );
  };

  render() {
    const { Icon } = this.state;

    if (Icon) return <Icon.default className={`icon ${this.props.name}`} />;
    return null;
  }
}

export default Icon;
