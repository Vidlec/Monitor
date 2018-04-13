import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Test from '@components/Test';

class App extends Component {
    constructor() {
        super();
        this.test = 'Mark!';
    }

    sayHello() {
        console.log(this.test);
    }

    render() {
        this.sayHello();
        return (
            <div>
                <Test />
                { this.test }
            </div>
        );
    }
}

export default hot(module)(App);
