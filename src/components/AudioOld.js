import React, { Component } from 'react';

class AudioOld extends Component {
    state = {
        mediaRecorder: null,
        recording: null,
    };

    // componentDidMount() {
    //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //         console.log('getUserMedia supported.');
    //
    //         navigator.mediaDevices.getUserMedia({
    //             audio: true
    //         }).then((stream) => {
    //             const mediaRecorder = new MediaRecorder(stream);
    //             if (mediaRecorder) {
    //                 this.setState({
    //                     mediaRecorder,
    //                 });
    //             }
    //         }).catch((err) => {
    //             console.log('The following getUserMedia error occured: ' + err);
    //         });
    //     } else {
    //         console.log('getUserMedia not supported on your browser!');
    //     }
    // }

    handleRecord = () => {
        console.log('Starting to record...');
        if (this.state.mediaRecorder) {
            this.state.mediaRecorder.start();
            let chunks = [];
            this.state.mediaRecorder.ondataavailable = function(e) {
                console.log('Data:', e.data);
                chunks.push(e.data);
            };

            let audioURL;
            this.state.mediaRecorder.onstop = function(e) {
                console.log('stopped');
                const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                chunks = [];
                audioURL = window.URL.createObjectURL(blob);
                console.log(audioURL);
                this.setState({
                    recording: audioURL,
                });
            };

            // console.log('chunks', chunks);
            // if (chunks.length > 0) {
            //     this.setState({
            //         recording: chunks,
            //     });
            // }
        }
    };

    handleStopRecording = () => {
        console.log('Stopping to record...');
        if (this.state.mediaRecorder) {
            this.state.mediaRecorder.stop();
        }
    };

    render() {
        return (
            <div className="App">
                <button onClick={this.handleRecord}>Record</button>
                <button onClick={this.handleStopRecording}>Stop recording</button>
                <audio autoPlay={true} controls={true} src={this.state.recording}/>
            </div>
        );
    }
}

export default AudioOld;