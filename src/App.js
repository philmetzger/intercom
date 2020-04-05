import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import Audio from "./components/Audio";
import Start from "./components/start/Start";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Start />
                        </Route>
                        <Route exact path="/channel/:id">
                            <Audio />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;