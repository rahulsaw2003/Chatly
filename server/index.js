import express from "express";
import dotenv from "dotenv/config";
import mongoDBConnect from "./mongoDB/connection.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import * as Server from "socket.io";

const app = express();

// For Cross-Origin Resource Sharing between the backend api and frontend
const corsConfig = {
	origin: process.env.BASE_URL,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use("/", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
mongoose.set("strictQuery", false);
mongoDBConnect();

app.post("/me", (req, res) => {
	res.send("Hello World");
});

const server = app.listen(process.env.PORT, () => {
	console.log(`Server Started on PORT - ${process.env.PORT}`);
});

const io = new Server.Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: process.env.BASE_URL,
	},
});

io.on("connection", (socket) => {
	socket.on("setup", (userData) => {
		socket.join(userData.id);
		socket.emit("connected");
	});

	socket.on("join room", (room) => {
		socket.join(room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageReceive) => {
		const chat = newMessageReceive.chatId;
		if (!chat.users) {
			console.log("chat.users is not defined");
			return;
		}
		chat.users.forEach((user) => {
			if (user._id === newMessageReceive.sender._id) return;
			socket.in(user._id).emit("message received", newMessageReceive);
		});
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded");
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
	});
	// console.log(`User Connected: ${socket.id}`)
	socket.emit("me", socket.id); // Emit the user's socket ID
});
