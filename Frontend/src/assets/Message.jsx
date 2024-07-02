import React from 'react'

const Message = ({ getFormattedDate, currentChat, msg }) => {
    return (
        <div className={`flex ${currentChat._id !== msg.receiverId ? "justify-start" : "justify-end"} text-black font-sans font-semibold relative`}>
            <div className={`relative p-2 rounded-xl min-w-[100px] max-w-[49%] ${currentChat._id !== msg.receiverId ? "rounded-bl-none bg-[#444452] " : "rounded-br-none bg-blue-600 "} `}>
                {msg.message}
                <div className={`absolute bottom-[-15px] ${currentChat._id !== msg.receiverId ? "left-0" : "right-0"} `}>
                    <p className='text-xs'>{getFormattedDate(msg.createdAt)}</p>
                </div>
            </div>
        </div>
    )
}

export default Message
