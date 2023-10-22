import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers, validUser } from "../apis/auth";
import { setActiveUser } from "../redux/activeUserSlice";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { BiNotification } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { setShowNotifications, setShowProfile } from "../redux/profileSlice";
import Chat from "./Chat";
import Profile from "../components/Profile";
import { acessCreate } from "../apis/chat.js";
import "./home.css";
import { fetchChats, setNotifications } from "../redux/chatsSlice";
import { getSender } from "../utils/logics";
import { setActiveChat } from "../redux/chatsSlice";
import Group from "../components/Group";
import Contacts from "../components/Contacts";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";
import Search from "../components/group/Search";
import AIbot from "../components/AIbot";

function Home() {
	const dispatch = useDispatch();
	const { showProfile, showNotifications } = useSelector((state) => state.profile);
	const { notifications } = useSelector((state) => state.chats);
	const { activeUser } = useSelector((state) => state);
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState("");

	const handleSearch = async (e) => {
		setSearch(e.target.value);
	};
	const handleClick = async (e) => {
		await acessCreate({ userId: e._id });
		dispatch(fetchChats());
		setSearch("");
	};
	useEffect(() => {
		const searchChange = async () => {
			if (search) {
				const { data } = await searchUsers(search);
				setSearchResults(data);
			} else {
				// Display all users when the search box is empty
				setSearchResults([]);
			}
			setIsLoading(false);
		};
		searchChange();
	}, [search]);
	useEffect(() => {
		const isValid = async () => {
			const data = await validUser();

			const user = {
				id: data?.user?._id,
				email: data?.user?.email,
				profilePic: data?.user?.profilePic,
				bio: data?.user?.bio,
				name: data?.user?.name,
			};
			dispatch(setActiveUser(user));
		};
		isValid();
	}, [dispatch, activeUser]);

	return (
		<>
			<div className="scrollbar-hide z-10 h-[100vh] my-[1px] lg:w-[99.8%] lg:mx-auto overflow-y-hidden shadow-2xl rounded-xl border-[1px] border-[#aabac8]">
				<div className="flex">
					{!showProfile ? (
						<div className="md:flex md:flex-col min-w-[390px] h-[100vh] md:h-[100vh] bg-[#ffff] relative border-r border-gray-500">
							<div className="h-[69px] px-4 bg-[#166e48]">
								<div className="flex">
									<a className="flex items-center relative  -top-2 h-[90px]" href="/">
										<h3 className="text-[23px] text-[#fff] font-body font-extrabold tracking-wider">Messages</h3>
									</a>
								</div>
								<div className="absolute top-4 right-5 flex items-center gap-x-3">
									<button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
										<NotificationBadge count={notifications.length} effect={Effect.SCALE} style={{ width: "18px", height: "18px", fontSize: "9px", padding: "4px 2px 2px 2px" }} />
										{showNotifications ? <RiNotificationBadgeFill style={{ width: "25px", height: "25px", color: "#319268" }} /> : <BiNotification style={{ color: "#fff", width: "25px", height: "25px" }} />}
									</button>
									<div className={`${showNotifications ? "overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#fafafa] px-4 py-2 shadow-2xl" : "hidden"}`}>
										<div className="text-[13px]">{!notifications.length && "No new messages"}</div>
										{notifications.map((e, index) => {
											return (
												<div
													onClick={() => {
														dispatch(setActiveChat(e.chatId));
														dispatch(setNotifications(notifications.filter((data) => data !== e)));
													}}
													key={index}
													className="text-[12.5px] text-black px-2 cursor-pointer"
												>
													{e.chatId.isGroup ? `New Message in ${e.chatId.chatName}` : `New Message from ${getSender(activeUser, e.chatId.users)}`}
												</div>
											);
										})}
									</div>
									<button onClick={() => dispatch(setShowProfile(true))} className="flex items-center gap-x-1 relative">
										<img className="w-[28px] h-[28px] rounded-[25px]" src={activeUser?.profilePic} alt="" />
										<IoIosArrowDown style={{ color: "#fff", height: "14px", width: "14px" }} />
									</button>
								</div>
							</div>
							<div class="border-b border-gray-400 mt-[1px]"></div>
							<div>
								<div className="mt-2 relative pt-6 px-4">
									<form onSubmit={(e) => e.preventDefault()}>
										<input onChange={handleSearch} className="w-[99.5%] bg-[#f6f6f6] text-[#111b21] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0 border-[1px] border-gray-400 shadow-md" type="text" name="search" placeholder="Search" />
									</form>

									<div className="absolute top-[36px] left-[27px]">
										<BsSearch style={{ color: "#c4c4c5" }} />
									</div>
									<div className="flex justify-between">
										<Group />
										<AIbot />
									</div>

									<div class="border-b border-gray-400 mt-[40px]"></div>

									<div style={{ display: search ? "" : "none" }} className="h-[100vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#fff] flex flex-col gap-y-3 pt-3 px-4">
										<Search searchResults={searchResults} isLoading={isLoading} handleClick={handleClick} search={search} />
									</div>
								</div>

								<Contacts />
							</div>
						</div>
					) : (
						<Profile className="min-w-[100%] sm:min-w-[390px] h-[100vh] bg-[#fafafa] shadow-xl relative" />
					)}
					<Chat className="chat-page relative lg:w-[100%] h-[100vh] bg-[#dfede8]" />
				</div>
			</div>
		</>
	);
}

export default Home;
