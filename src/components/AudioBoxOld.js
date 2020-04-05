import React, { Component } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import { withWebRTC } from 'react-liowebrtc';

class AudioBox extends Component {
    state = {
        record: false,
        blob: null,
    };

    startRecording = () => {
        this.setState({
            record: true
        });
    };

    stopRecording = () => {
        this.setState({
            record: false
        });
    };

    onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        this.setState({
            blob: recordedBlob,
        });
    };

    sendAudio = () => {
        console.log('sendAudio', this.state.blob);
        this.props.webrtc.shout('chat', this.state.blob);
        this.props.onSend(this.state.blob);
    };

    render() {
        return (
            <div className="container">
                <ReactMic
                    record={this.state.record}
                    onStop={this.onStop}
                    mimeType="audio/mp3"
                />

                <button onClick={this.startRecording} type="button">Start</button>
                <button onClick={this.stopRecording} type="button">Stop</button>
                <button onClick={this.sendAudio} type="button">Send audio</button>
            </div>
        );
    }
}

export default withWebRTC(AudioBox);