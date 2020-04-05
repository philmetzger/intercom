import React, { Component } from 'react';
import { Card, Button, Divider, Typography, Form, Input } from 'antd';
import AppContainer from "../AppContainer";
import { PlusOutlined, LoginOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import '../../styles/Start.css';

const { Text } = Typography;

class Start extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    handleCreateNewChannel = () => {
        this.props.history.push(`/channel/${uuidv4()}`)
    };

    handleJoin = () => {
        this.props.history.push(`/channel/${this.input.current.props.value}`);
    };

    render() {
        return (
            <AppContainer>
                <div className="start-container">
                    <Card className="start-container__card">
                        <div className="start-container__card-content">
                            <div className="start-container__card-top">
                                <Button type="primary" block size="large" icon={<PlusOutlined />} onClick={this.handleCreateNewChannel}>
                                    Create new channel
                                </Button>
                            </div>
                            <Divider className="start-container__card-divider">
                                <Text>Or, join existing channel</Text>
                            </Divider>
                            <div className="start-container__card-bottom">
                                <Form
                                    className="start-container__form-join"
                                    name="id"
                                    onFinish={this.handleJoin}
                                    size="large"
                                >
                                    <Form.Item
                                        name="channelId"
                                        rules={[
                                            {
                                                required: true,
                                                type: "regexp",
                                                pattern: new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
                                                message: 'Please enter a valid existing channel ID',
                                            },
                                        ]}
                                    >
                                        <Input min={30} max={40} placeholder="Enter channel ID" autoFocus={true} ref={this.input}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block size="large" icon={<LoginOutlined />}>
                                            Join
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
            </AppContainer>
        );
    }
}

export default withRouter(Start);