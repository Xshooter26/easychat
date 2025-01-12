import React, { useRef } from 'react'
import {useChatStore} from "../store/useChatStore";
import { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import MessageInputField from './MessageInputField'
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
import TypingIndicator from './TypingIndicator';


const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,
    selectedUser,getRealTimeMessages
    ,dontGetRealTimeMessages,
    typingUsers
  } = useChatStore();
const {authUser, socket} = useAuthStore();
const messageEndRef = useRef(null);

  

  useEffect(() => {
    getMessages(selectedUser._id)

    getRealTimeMessages();
    return ()=> dontGetRealTimeMessages();

  }, [selectedUser._id,getMessages,getRealTimeMessages,dontGetRealTimeMessages])

  useEffect(() => {
    if(messageEndRef.current && messages){
    messageEndRef.current.scrollIntoView({behaviour : "smooth"})
    }
  },[messages]);



  useEffect(() => {
    if (!socket) return;

    socket.on("typing", ({ senderId }) => {
        useChatStore.getState().setTyping(senderId, true);
    });

    socket.on("stop typing", ({ senderId }) => {
        useChatStore.getState().setTyping(senderId, false);
    });

    return () => {
        socket.off("typing");
        socket.off("stop typing");
    };
}, [socket]);

  if(isMessagesLoading) {return(
    <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInputField/>
  
   

    </div>
  )}



  return (
    <div className='flex-1 flex-col overflow-auto'>
      <ChatHeader/>
      <div className='flex-1 overflow-auto auto p-4 space-y-4' >
        {messages.map((message) =>(
          <div 
          key={message._id}
          className={ `chat ${message.senderId === authUser._id ? "chat-end": "chat-start"}`}
          ref = {messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={
                  message.senderId === authUser._id
                  ? authUser.profilePic || "/src/assets/profileimg.png"
                  : selectedUser.profilePic || "/src/assets/profileimg.png"
                } alt="profile pic" />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className='text-xs opcaity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className={`chat-bubble flex flex-col 
              ${message.senderId === authUser._id ? "bg-primary text-black" : "bg-secondary-content text-white"}`}>
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
        )}
        {message.text && <p>{message.text}</p>}
        {message.gif && (
  <div className="mb-3 flex items-center gap-2">
    <img
      src={message.gif}
      alt="GIF"
      className="rounded-lg max-w-[200px] max-h-[200px] object-cover" // Resize GIF here
    />
  </div>
)}
        
            </div>
            
          </div>
        ))}
         {typingUsers.has(selectedUser?._id) && <TypingIndicator />}
      </div>

      
      <MessageInputField/>

     

      
    </div>
  );
};

export default ChatContainer