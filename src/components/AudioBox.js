import React, { Component } from 'react';
import { withWebRTC } from 'react-liowebrtc';
import MicRecorder from 'mic-recorder-to-mp3';
import { blobToBinaryString } from 'blob-util';
import { AudioOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AudioBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        };
    }

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                console.log('sending1');
                blobToBinaryString(blob).then((binaryString) => {
                    this.props.webrtc.shout('chat', binaryString);
                    this.props.onSend(binaryString);
                    console.log('sending');
                }).catch((err) => {
                    // error
                });
                this.setState({ isRecording: false });
            }).catch((e) => console.log(e));
    };

    toggleRecord = () => {
        if (this.state.isRecording) {
            this.stop();
        } else {
            this.start();
        }
    };

    render(){
        return (
            <Button
                type="primary"
                block={true}
                icon={<AudioOutlined />}
                size="large"
                onClick={this.toggleRecord}
                className="audio-box__button"
            >
                {this.state.isRecording ? 'Recording' : 'Record'}
            </Button>
        );
    }
}

export default withWebRTC(AudioBox);