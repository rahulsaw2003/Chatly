import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveChat, fetchChats } from '../redux/chatsSlice'
import { useEffect } from 'react'
import { getChatName, getChatPhoto } from '../utils/logics'
import NoContacts from './ui/NoContacts'
// import SkeletonLoading from './ui/SkeletonLoading'
var aDay = 24 * 60 * 60 * 1000;
function Contacts() {
  const { chats, activeChat } = useSelector((state) => state.chats)
  const dispatch = useDispatch()
  const activeUser = useSelector((state) => state.activeUser)
  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])

function formatTimeAgo(timestamp) {
  const now = new Date();
  const updatedAt = new Date(timestamp);
  const secondsAgo = Math.floor((now - updatedAt) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} ${secondsAgo === 1 ? 'second' : 'seconds'} ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else if (secondsAgo < 86400 * 2) {
    return `${Math.floor(secondsAgo / 3600 / 24)} day ago`;
  } else {
    return `${Math.floor(secondsAgo / 3600 / 24)} days ago`;
  }
}

  return (
		<>
			<div className="flex flex-col -space-y-1 overflow-y-scroll scrollbar-hide h-[87vh] pb-10">
				{chats?.length > 0 ? (
					chats?.map((e) => {
						return (
							<div
								onClick={() => {
									dispatch(setActiveChat(e));
								}}
								key={e._id}
								className={`flex items-center justify-between sm:gap-x-1 md:gap-x-1 mt-1 ${activeChat._id === e._id ? "bg-[#fafafa]" : "bg-[#fff]"} cursor-pointer  py-4 px-2`}
							>
								<div className="flex items-center gap-x-5 sm:gap-x-3 md:gap-x-4">
									<img className="w-12 h-12  sm:w-12 sm:h-12 rounded-[30px] shadow-md object-cover" src={getChatPhoto(e, activeUser)} alt="profile" />
									<div>
										<h5 className="text-[13.6px] sm:text-[16px] text-[#2b2e33] font-bold">{getChatName(e, activeUser)}</h5>
										<p className="text-[13.6px] sm:text-[13.5px] font-medium text-[#56585c] "> {e.latestMessage?.message}</p>
									</div>
								</div>
								<div className="flex flex-col items-end gap-y-[8px]">
									<p className="text-[12.4px] sm:text-[12px] font-normal text-[#b0b2b3] tracking-wide">{formatTimeAgo(Date.parse(e.updatedAt) - aDay)}</p>
								</div>
							</div>
						);
					})
				) : (
					<NoContacts />
				)}
			</div>
			
		</>
	);
}

export default Contacts