import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import VideoPlayer from "../components/VideoPlayer";
import Sidebar from "../components/Sidebar";
import Notifications from "../components/Notification";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: "30px 100px",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "600px",
		border: "2px solid black",

		[theme.breakpoints.down("xs")]: {
			width: "90%",
		},
	},
	image: {
		marginLeft: "15px",
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
	},
}));

const Video = () => {
	const classes = useStyles();
  const { activeChat, notifications } = useSelector((state) => state.chats);
    console.log(activeChat)
  const { name, id } = useParams();

	return (
		<div className={classes.wrapper}>
			{/* 
			<VideoPlayer />
			 */}
			<AppBar className={classes.appBar} position="static" color="inherit">
				<Typography variant="h2" align="center">
					Video Chat
				</Typography>
			</AppBar>
			<VideoPlayer name1={name} />
			<Sidebar name1={name}>
				<Notifications />
			</Sidebar>
		</div>
	);
};

export default Video;
