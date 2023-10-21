import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Model from '../components/Model';
import { BsEmojiSmile, BsFillEmojiSmileFill } from "react-icons/bs"
import { fetchMessages, sendMessage } from '../apis/messages';
import { useEffect } from 'react';
import MessageHistory from '../components/MessageHistory';
import io from "socket.io-client"
import "./home.css"
import { fetchChats, setNotifications } from '../redux/chatsSlice';
import Loading from '../components/ui/Loading';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { getChatName } from '../utils/logics';
// import Typing from '../components/ui/Typing';
import { validUser } from '../apis/auth';
import Robot from "../assets/robot.gif";
import { AiOutlineSend } from 'react-icons/ai';


const ENDPOINT = process.env.REACT_APP_SERVER_URL
let socket, selectedChatCompare;

function Chat(props) {
  const { activeChat, notifications } = useSelector((state) => state.chats)
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPicker, setShowPicker] = useState(false);
  const activeUser = useSelector((state) => state.activeUser)

  const keyDownFunction = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && (message)) {
      setMessage("")
      socket.emit("stop typing", activeChat._id)
      const data = await sendMessage({ chatId: activeChat._id, message })
      socket.emit("new message", data)
      setMessages([...messages, data])
      dispatch(fetchChats())
    }
  }


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.on("typing", () => setIsTyping(true))
    socket.on("stop typing", () => setIsTyping(false))
  }, [])

  useEffect(() => {
    socket.emit("setup", activeUser)
    socket.on("connected", () => {
      setSocketConnected(true)
    })
  }, [messages, activeUser])
  useEffect(() => {
    const fetchMessagesFunc = async () => {
      if (activeChat) {
        setLoading(true)
        const data = await fetchMessages(activeChat._id)
        setMessages(data)
        socket.emit("join room", activeChat._id)
        setLoading(false)

      }
      return
    }
    fetchMessagesFunc()
    selectedChatCompare = activeChat

  }, [activeChat])
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if ((!selectedChatCompare || selectedChatCompare._id) !== newMessageRecieved.chatId._id) {
        if (!notifications.includes(newMessageRecieved)) {
          dispatch(setNotifications([newMessageRecieved, ...notifications]))
        }
      }
      else {
        setMessages([...messages, newMessageRecieved])
      }
      dispatch(fetchChats())
    })
  })
  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()
      if (!data?.user) {
        window.location.href = "/login"
      }

    }
    isValid()
  }, [])
  if (loading) {
    return <div className={props.className}>
      <Loading />
    </div>
  }
  return (
    <>
      {
        activeChat ?
          <div className={props.className} style={{ position: 'relative' }}>
            <div className='flex justify-between items-center px-5 py-3 bg-[#e6e5e5] w-[100%] shadow-lg'>
              
              <div className='flex items-center gap-x-[10px]'>
                <div className='flex flex-col items-start justify-center'>
                  <h5 className='text-[17px] text-[#2b2e33] font-bold tracking-wide'>{getChatName(activeChat, activeUser)}</h5>
                  <p className='text-[11px] text-[#84878a]'>Last seen recently</p>
                </div>
              </div>
              
              <div>
                <Model />
              </div>
            </div>
            <div className='scrollbar-hide w-[100%] h-[70vh] md:h-[66vh] lg:h-[82vh] flex flex-col overflow-y-scroll p-4'>
              <MessageHistory typing={isTyping} messages={messages} />
            </div>
            
            <div className='shadow-2 px-2 text-center flex flex-col-reverse' style={{ position: 'absolute', bottom: 20, width: '100%' }}>
           
            {showPicker && (
              <div
                style={{
                  position: 'absolute',
                  top: '-450px',
                  left: 0,
                  zIndex: 1,
                }}
              >
                <Picker data={data} onEmojiSelect={(e) => setMessage(message + e.native)} />
              </div>
            )}

            <div className='bg-[#cce0f3] border-[1px] border-[#aabac8] px-3 py-3 min-w-full sm:w-[400px] md:w-[350px] h-[50px] lg:w-[500px] rounded-t-[10px] shadow-2xl'>
              <div className='flex'>
                <div onClick={() => setShowPicker(!showPicker)} className='cursor-pointer'>
                  {showPicker ? <BsFillEmojiSmileFill className='w-[20px] h-[20px] text-[#ffb02e] border-[black]' /> : <BsEmojiSmile className='w-[20px] h-[20px]' />}
                </div>

                <form
                  onClick={() => setShowPicker(false)} 
                  onKeyDown={(e) => keyDownFunction(e)}
                  onSubmit={(e) => e.preventDefault()}
                  className='flex-grow'
                >
                  <input
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (!socketConnected) return;
                      if (!typing) {
                        setTyping(true);
                        socket.emit('typing', activeChat._id);
                      }
                      let lastTime = new Date().getTime();
                      var time = 3000;
                      setTimeout(() => {
                        var timeNow = new Date().getTime();
                        var timeDiff = timeNow - lastTime;
                        if (timeDiff >= time && typing) {
                          socket.emit("stop typing", activeChat._id);
                          setTyping(false);
                        }
                      }, time);
                    }}
                    className='focus:outline-0 w-[100%] bg-[#cce0f3] ml-4' 
                    type="text"
                    name="message"
                    placeholder="Enter message"
                    value={message}
                  />
                </form>

                <button onClick={(e) => keyDownFunction(e)} className='bg-[#741dc0] border-[2px] border-[#d4d4d4] text-[22px] px-2 py-1 text-[#ffffff] font-medium rounded-[7px] -mt-1'>
                  <AiOutlineSend />
                </button>
              </div>
            </div>
          </div>
          </div> :
          <div className={props.className}>
            <div className='relative'>
              <div className='absolute top-[10vh] left-[28%] flex flex-col items-center justify-center'>
                <div className='w-[80%] h-[90%]'>
                  <img alt="User profile" src={Robot} />
                </div>
                
                <h1 className='text-[#111b21] text-[20px] font-medium tracking-wider -top-10'>Welcome <span className='text-[#166e48] text-[19px] font-bold'> {activeUser.name}</span></h1>
                <h3 className='text-[#000000] text-[19px] font-medium'>Please select a chat to Start messaging.</h3>
              </div>
            </div>
          </div>

      }
    </>
  )
}

export default Chat