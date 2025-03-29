
import React from 'react'

const Message = ({ getFormattedDate, currentChat, msg }) => {
    const ifPrefixMatch = (str, prefix) => {
        return str.startsWith(prefix);
    }
    return (
        <div className={`flex ${currentChat._id !== msg.receiverId ? "justify-start" : "justify-end"} text-black font-sans font-semibold relative`}>
            {
                ifPrefixMatch(msg.message, "data:image") ?
                    <div className={`flex`}>
                        <div className="relative max-w-[240px]">
                            <img 
                                className={`rounded-xl border-2 object-cover h-[200px] w-[200px] ${
                                    currentChat._id !== msg.receiverId 
                                        ? "border-darker" 
                                        : "border-accent"
                                }`} 
                                src={msg.message} 
                                alt="Chat image"
                            />
                            <div className={`absolute bottom-[-15px] ${currentChat._id !== msg.receiverId ? "left-0" : "right-0"} text-litest`}>
                                <p className='text-xs'>{getFormattedDate(msg.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`relative p-3 rounded-xl min-w-[100px] max-w-[49%] ${
                        currentChat._id !== msg.receiverId 
                            ? "rounded-bl-none bg-liter text-darkest" 
                            : "rounded-br-none bg-accent text-litest"
                        }`}>
                        {msg.message}
                        <div className={`absolute bottom-[-15px] ${currentChat._id !== msg.receiverId ? "left-0" : "right-0"} text-litest`}>
                            <p className='text-xs'>{getFormattedDate(msg.createdAt)}</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Message
