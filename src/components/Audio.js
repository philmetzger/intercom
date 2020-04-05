import React, { Component } from 'react';
import AudioBox from "./AudioBox";
import {LioWebRTC} from "react-liowebrtc";
import AppContainer from "./AppContainer";
import { withRouter } from 'react-router-dom';
import { binaryStringToBlob } from 'blob-util';
import AudioSpectrum from 'react-audio-spectrum';
import '../styles/Audio.css';
import { Card } from 'antd';

class Audio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channelId: props.match.params.id,
            blob: null,
            options: {
                autoRequestMedia: true,
                debug: false,
                dataOnly: true,
            }
        };
    }

    join = (webrtc) => {
        if (this.state.channelId) {
            webrtc.joinRoom(this.state.channelId);
        }
    };

    handleAddAudio = (blob) => {
        this.setState({
            blob: blob ? binaryStringToBlob(blob, 'audio/mp3') : null,
        });
    };

    handleCreatedPeer = (webrtc, peer) => {
        console.log(`Peer-${peer.id.substring(0, 5)} joined the room!`);
    };

    handlePeerData = (webrtc, type, payload, peer) => {
        console.log('handlePeerData', type, payload, peer);
        switch(type) {
            case 'chat':
                this.handleAddAudio(payload);
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <AppContainer>
                <Card className="audio-container__card">
                    <LioWebRTC
                        options={this.state.options}
                        onReady={this.join}
                        onCreatedPeer={this.handleCreatedPeer}
                        onReceivedPeerData={this.handlePeerData}
                    >
                        <AudioBox
                            onSend={(blob) => {
                                console.log('blob', blob);
                                if (blob) {
                                    this.handleAddAudio(blob);
                                }
                            }}
                        />
                        <AudioSpectrum
                            id="audio-canvas"
                            height={260}
                            width={360}
                            audioId={'audio-element'}
                            capColor={'red'}
                            capHeight={2}
                            meterWidth={2}
                            meterCount={512}
                            meterColor={[
                                {stop: 0, color: '#f00'},
                                {stop: 0.5, color: '#0CD7FD'},
                                {stop: 1, color: 'red'}
                            ]}
                            gap={4}
                        />
                        <audio id="audio-element" className="audio-element" autoPlay={true} controls={true} src={this.state.blob instanceof Blob ? URL.createObjectURL(this.state.blob) : null}/>
                    </LioWebRTC>
                </Card>
            </AppContainer>
        );
    }
}

export default withRouter(Audio);