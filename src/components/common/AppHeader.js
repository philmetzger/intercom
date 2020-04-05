import React, { Component } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import '../../styles/AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <div className="app-header">
                <h1><AudioOutlined /> Intercom</h1>
            </div>
        );
    }
}

export default AppHeader;