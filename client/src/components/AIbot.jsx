import { SiChatbot } from "react-icons/si";
import React, { useState } from "react";
// import AIBotComponent from "./AIBotComponent";
import { Link } from "react-router-dom";

const AIbot = () => {
	const [isChatbotOpen, setChatbotOpen] = useState(false);

	const toggleChatbot = () => {
		setChatbotOpen(!isChatbotOpen);
	};

	return (
		<>
			<button className="transition duration-150 ease-in-out" onClick={toggleChatbot}>
				<div className="flex justify-start border-r-2">
					<Link to="/chatbot">
						<button className="text-[12px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f6f6f6] text-[#1f2228] py-1 -mb-7 mt-2  px-2 border-[1px] rounded-md border-gray-300 shadow-md mr-2">
							Ask AI ChatBot  <SiChatbot className="text-[15px]" />
						</button>
					</Link>
				</div>
			</button>
		</>
	);
};

export default AIbot;
