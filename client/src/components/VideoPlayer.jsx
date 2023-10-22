import React, { useContext, useState } from "react";
import { Grid, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
	video: {
		width: "550px",
		[theme.breakpoints.down("xs")]: {
			width: "300px",
		},
	},
	gridContainer: {
		justifyContent: "center",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	paper: {
		padding: "10px",
		border: "2px solid black",
		margin: "10px",
	},
}));

const VideoPlayer = ({ name1 }) => {
	const { callAccepted, myVideo, name, setName, userVideo, callEnded, stream, call } = useContext(SocketContext);
	const classes = useStyles();

	const [shouldNavigate, setShouldNavigate] = useState(false);

	const handleGoBack = () => {
		setShouldNavigate(true); // Set the flag to true
	};
	setName(name1);
	if (shouldNavigate) {
		return <Navigate to="/" replace />; // Render the Navigate component
	}
	return (
		<Grid container className={classes.gridContainer}>
			{stream && (
				<Paper className={classes.paper}>
					<Button variant="contained" color="primary" onClick={handleGoBack}>
						Go Back
					</Button>
					<Grid item xs={12} md={6}>
						<Typography variant="h5" gutterBottom>
							{name1}
						</Typography>
						<video playsInline muted ref={myVideo} autoPlay className={classes.video} />
					</Grid>
				</Paper>
			)}
			{callAccepted && !callEnded && (
				<Paper className={classes.paper}>
					<Grid item xs={12} md={6}>
						<Typography variant="h5" gutterBottom>
							{call.name || "Name"}
						</Typography>
						<video playsInline ref={userVideo} autoPlay className={classes.video} />
					</Grid>
				</Paper>
			)}
		</Grid>
	);
};

export default VideoPlayer;
