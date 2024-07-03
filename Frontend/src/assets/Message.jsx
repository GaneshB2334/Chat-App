import React from 'react'

const Message = ({ getFormattedDate, currentChat, msg }) => {
    const ifPrefixMatch = (str, prefix) => {
        return str.startsWith(prefix);
    }
    return (
        <div className={`flex ${currentChat._id !== msg.receiverId ? "justify-start" : "justify-end"} text-black font-sans font-semibold relative`}>
            {
                ifPrefixMatch(msg.message, "data:image") ?
                    <div className={` flex`}>
                        <img className={`rounded-xl border-2 ${currentChat._id !== msg.receiverId ? " border-gray-950" : " border-gray-500"}`} src={msg.message} />
                        <div className={`absolute bottom-[-15px] ${currentChat._id !== msg.receiverId ? "left-0" : "right-0"} `}>
                            <p className='text-xs'>{getFormattedDate(msg.createdAt)}</p>
                        </div>
                    </div>
                    :
                    <div className={`relative p-2 rounded-xl min-w-[100px] max-w-[49%] ${currentChat._id !== msg.receiverId ? "rounded-bl-none bg-[#646494] " : "rounded-br-none bg-blue-600 "} `}>
                        {msg.message}
                        <div className={`absolute bottom-[-15px] ${currentChat._id !== msg.receiverId ? "left-0" : "right-0"} `}>
                            <p className='text-xs'>{getFormattedDate(msg.createdAt)}</p>
                        </div>
                    </div>}
        </div>
    )
}

export default Message
