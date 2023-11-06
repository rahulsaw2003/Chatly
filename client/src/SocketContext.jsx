import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io(process.env.REACT_APP_SERVER_URL);

const ContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState(null);
	const [name, setName] = useState("");
	const [call, setCall] = useState({});
	const [me, setMe] = useState("");
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();

	useEffect(() => {
		// Get user's media stream
		if (window.location.pathname.startsWith("/video")) {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((currentStream) => {
					setStream(currentStream);
					myVideo.current.srcObject = currentStream;
				})
				.catch((error) => {
					// Handle errors if the user denies access to the camera/microphone
					console.error("Error accessing media devices:", error);
				});
		}

		// Listen for "me" event from the server
		socket.on("me", (id) => setMe(id));
		// Listen for incoming calls
		socket.on("callUser", ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });

		peer.on("signal", (data) => {
			// Send the answer signal to the caller
			socket.emit("answerCall", { signal: data, to: call.from });
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		// Signal the caller
		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });

		peer.on("signal", (data) => {
			// Initiate a call and send the signal data to the other user
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name,
			});
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		// Listen for the answer signal
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true);
			// Signal the other user
			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);

		// Close the connection
		connectionRef.current.destroy();

		// Reload the page or perform other actions
		window.location.reload();
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				setName,
				callEnded,
				me,
				callUser,
				leaveCall,
				answerCall,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
