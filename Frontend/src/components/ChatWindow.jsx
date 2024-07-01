import { AttachFile, Close, EmojiEmotions, Send } from '@mui/icons-material';
import { Avatar, CircularProgress, IconButton, Tooltip } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef } from 'react';
import Message from '../assets/Message';

const ChatWindow = ({ HandleSend, isMessageSent, allMsg, setIsMsgLoaded, setCurrentChat, setIsPickerVisible, setMessage, message, ImageToSend, isPickerVisible, currentChat, isMsgLoaded }) => {

    const messageEndRef = useRef(null);

    const getFormattedDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView();
        }
    }, [allMsg]);

    return (
        <div className='flex flex-col border h-[85vh] bg-darkest p-0 border-[#444343] w-[65%] max-xl:w-[55%] max-lg:w-[45%] max-md:hidden' >
            <div className='flex items-center px-5 py-3 h-[70px] content-center text-litest'>
                <Avatar sx={{ height: "50px", width: "50px" }} src={currentChat ? currentChat.profile : null} />
                <p className='flex-grow text-center text-2xl text-litest'>{currentChat ? currentChat.fullname : "Username"}</p>
                <Tooltip title="Close Chat">
                    <IconButton onClick={() => {
                        setCurrentChat("")
                        setIsMsgLoaded(null)
                    }}>
                        <Close color='primary' />
                    </IconButton>
                </Tooltip>
            </div>
            <div className='w-full m-0 overflow-y-scroll flex-grow bg-lite '>
                {isMsgLoaded === null ? <div className='text-black w-full h-full content-center text-center text-6xl '>
                    Let's start the chat!
                </div> :
                    <>{!isMsgLoaded ? <div className='w-full h-full flex flex-col justify-center items-center'>
                        <CircularProgress />
                        <p className='font-bold text-3xl w-full text-center text-black font-sans'>Loading Your Messages</p>
                    </div> :
                        <div className='w-full h-full p-2 overflow-scroll'>
                            <div className='flex flex-col gap-5'>
                                {
                                    allMsg.map((msg, index) => {
                                        return (
                                            <Message key={index} getFormattedDate={getFormattedDate} currentChat={currentChat} msg={msg} />
                                        )
                                    })
                                }
                                <div ref={messageEndRef} />
                            </div>
                        </div>
                    }</>
                }
            </div>
            <div className={`flex items-center justify-center m-0 relative ${currentChat ? "" : "hidden"}`}>
                <div>

                    <IconButton
                        onClick={() => {
                            setIsPickerVisible(!isPickerVisible)
                        }}>
                        {isPickerVisible ?
                            <Close color='primary' />
                            :
                            <EmojiEmotions color='primary' />
                        }
                    </IconButton>
                    <div className='absolute bottom-10 z-10' >
                        {isPickerVisible && <EmojiPicker open={isPickerVisible} onEmojiClick={(Emoji) => { setMessage(message + Emoji.emoji) }} searchPlaceHolder={message} skinTonesDisabled={false} searchDisabled={false} />}
                    </div>
                </div>
                <input className='rounded-xl outline-none p-3 flex-grow'
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") {
                            return;
                        }
                        HandleSend();
                    }}
                    readOnly={currentChat ? false : true}
                    value={message}
                    autoFocus={currentChat ? true : false}
                    onChange={(e) => { setMessage(e.target.value) }}
                    onFocus={() => { setIsPickerVisible(false) }}
                    type="text" placeholder='Send Message...' />
                <Tooltip title="Send">
                    <IconButton onClick={HandleSend}>
                        {isMessageSent ?
                            <Send color='primary' />
                            :
                            <CircularProgress size={20} color='primary' />
                        }
                    </IconButton>
                </Tooltip>
                <Tooltip title="Only Images Supported Now ">
                    <IconButton onClick={() => { ImageToSend.current.click() }}>
                        <AttachFile color='primary' />
                        <input ref={ImageToSend} type="file" accept='image/*' style={{ display: "none" }} onChange={() => { }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default ChatWindow
