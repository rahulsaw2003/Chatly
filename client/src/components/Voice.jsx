// WebRTC.js
import React, { useState } from "react";
import SimplePeer from "simple-peer";

const Voice = () => {
	const [localStream, setLocalStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);
	const [peer, setPeer] = useState(null);

	// Initialize local media stream
	const setupLocalStream = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
		setLocalStream(stream);
	};

	// Start a call
	const startCall = () => {
		const newPeer = new SimplePeer({ initiator: true, stream: localStream });

		newPeer.on("signal", (data) => {
			// Send the signal data to the other user
		});

		newPeer.on("stream", (stream) => {
			setRemoteStream(stream);
		});

		setPeer(newPeer);
	};

	// Answer a call
	const answerCall = (signalData) => {
		const newPeer = new SimplePeer({ initiator: false, stream: localStream });

		newPeer.on("signal", (data) => {
			// Send the signal data back to the caller
		});

		newPeer.on("stream", (stream) => {
			setRemoteStream(stream);
		});

		newPeer.signal(signalData);
		setPeer(newPeer);
	};

	return (
		<div>
			<button onClick={setupLocalStream}>Start Local Stream</button>
			<button onClick={startCall}>Start Call</button>
			<button onClick={answerCall}>Answer Call</button>
			<audio ref={(audio) => audio && (audio.srcObject = remoteStream)} autoPlay />
		</div>
	);
};

export default Voice;
