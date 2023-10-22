import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";

const API_KEY = process.env.REACT_APP_CHATBOT_API_KEY;

const systemMessage = {
	role: "system",
	content: "Explain everything like I'm a customer of the text messaging app who wants to seek help from you",
};

const AIBotComponent = () => {
	const [messages, setMessages] = useState([
		{
			message: "Hello, I'm Chatly Bot! Ask me anything!",
			sender: "ChatGPT",
		},
	]);
	const [isTyping, setIsTyping] = useState(false);

	const handleSend = async (message) => {
		const newMessage = {
			message: message,
			sender: "user",
			direction: "outgoing",
		};

		const newMessages = [...messages, newMessage];

		setMessages(newMessages);
		setIsTyping(true);

		await processMessageToChatBot(newMessages);
	};

	async function processMessageToChatBot(chatMessages) {
		let apiMessages = chatMessages.map((messageObject) => {
			let role = "";
			if (messageObject.sender === "ChatGPT") {
				role = "assistant";
			} else {
				role = "user";
			}
			return { role: role, content: messageObject.message };
		});

		const apiRequestBody = {
			model: "gpt-3.5-turbo",
			messages: [systemMessage, ...apiMessages],
		};

		await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + API_KEY,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(apiRequestBody),
		})
			.then((data) => data.json())
			.then((data) => {
				setMessages([
					...chatMessages,
					{
						message: data.choices[0].message.content,
						sender: "ChatGPT",
					},
				]);
				setIsTyping(false);
			});
	}

	const handleBack = () => {
		window.history.back();
	};

	return (
		<div style={{ position: "relative", height: "92vh", width: "100%" }}>
			<div className="px-2 py-2 bg-[#166e48] flex items-center justify-between">
				<button onClick={handleBack} className="bg-[#c7c5c5] hover:bg-[#8d9591] text-black px-3 py-1 rounded flex items-center border-[1px] border-black">
					Go Back
				</button>
				<h2 className="text-white font-bold text-[25px] text-center flex-grow">AI-Powered Chat Support</h2>
			</div>

			<MainContainer style={{ paddingTop: "20px" }}>
				<ChatContainer>
					<MessageList typingIndicator={isTyping ? <TypingIndicator content="Chatbot is typing" /> : null}>
						{messages.map((message, i) => {
							return <Message key={i} model={message} />;
						})}
					</MessageList>
					<MessageInput placeholder="Type your query here" onSend={handleSend} />
				</ChatContainer>
			</MainContainer>
		</div>
	);
};

export default AIBotComponent;
