import React, { Component } from 'react';
import { hot } from 'react-hot-loader'

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <nav>
                        BLAH
                    </nav>
                </div>

                <div>
                    TEST
                </div>
            </React.Fragment>
        );
    }
}

export default hot(module)(App);