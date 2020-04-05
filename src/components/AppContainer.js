import React, { Component } from 'react';
import AppHeader from "./common/AppHeader";
import '../styles/AppContainer.css';

class AppContainer extends Component {
    render() {
        return (
            <>
                <div className="app-container">
                    <div className="app-container__content">
                        <AppHeader />
                        {this.props.children}
                    </div>
                </div>
                <div className="app-container__footer">
                    &copy; Intercom {(new Date()).getFullYear()} &middot; Creator <a href="https://twitter.com/strange_quirks" target="_blank">Philip Metzger</a>
                </div>
            </>
        );
    }
}

export default AppContainer;