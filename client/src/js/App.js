import React, { Component } from 'react';
import { hot } from 'react-hot-loader'

class App extends Component {
    constructor() {
        super();
        this.test = 'sddsd';
    }

    sayHello() {
        console.log(this.test);
    }

    render() {
        this.sayHello();
        return (
            <div>
                {this.test}
            </div>
        );
    }
}

export default hot(module)(App);