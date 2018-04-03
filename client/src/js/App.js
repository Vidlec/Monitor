import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <nav>
                        <Link to="/">Home</Link>
                    </nav>
                </div>

                <div>
                    <Route path="/" component={ <div>Oh, hi Mark!</div> }/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;