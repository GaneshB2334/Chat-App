import { AttachFile, Close, EmojiEmotions, Send } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import Message from "../assets/Message";
import DateDivider from "../assets/DateDivider";
import CustomLoader from "./CustomLoader";
import axios from "axios";

const ChatWindow = ({
  HandleSend,
  isMessageSent,
  allMsg,
  setAllMsg,
  setIsMsgLoaded,
  setCurrentChat,
  setIsPickerVisible,
  setMessage,
  message,
  ImageToSend,
  isPickerVisible,
  currentChat,
  isMsgLoaded,
}) => {
  const messageEndRef = useRef(null);
  const [tempImg, setTempImg] = useState(false);
  const [isTempImgSent, setisTempImgSent] = useState(true);

  const getFormattedDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const getDateLabel = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  };

  const organizeMessagesByDate = () => {
    if (allMsg.length === 0) return [];
    
    const result = [];
    let currentDate = null;
    
    for (const msg of allMsg) {
      const messageDate = new Date(msg.createdAt);
      const dateLabel = getDateLabel(messageDate);
      
      if (dateLabel !== currentDate) {
        currentDate = dateLabel;
        result.push({ type: "divider", date: currentDate });
      }
      
      result.push({ type: "message", data: msg });
    }
    
    return result;
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [allMsg]);

  const SendImageToUser = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const message = reader.result;
      setMessage(message);
      setTempImg(true);
    };
  };

  const HandleTempImg = async () => {
    if (!message) {
      return;
    }
    setisTempImgSent(false);
    await axios
      .post(
        `https://chat-app-ku8j.onrender.com/api/messages/send/${currentChat._id}`,
        { message },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log("error in sending message --> ", err);
      })
      .finally(() => {
        setMessage("");
        setisTempImgSent(true);
        setTempImg(false);
      });
    setAllMsg((prevMsgs) => [
      ...prevMsgs,
      {
        receiverId: currentChat._id,
        message,
        createdAt: new Date(),
      },
    ]);
  };

  const organizedMessages = organizeMessagesByDate();

  return (
    <div
      className={`flex flex-col h-[85vh] bg-darkest p-0 w-[65%] max-xl:w-[55%] max-lg:w-[60%] ${
        currentChat ? "max-md:w-[90%]" : "max-md:hidden"
      } border-l-2 border-black`}
    >
      <div className="flex items-center px-5 py-3 h-[70px] content-center text-litest">
        <Avatar
          sx={{ height: "50px", width: "50px" }}
          src={currentChat ? currentChat.profile : null}
        />
        <p className="flex-grow text-center text-2xl text-litest">
          {currentChat ? currentChat.fullname : "Username"}
        </p>
        <Tooltip title="Close Chat">
          <IconButton
            onClick={() => {
              setCurrentChat("");
              setIsMsgLoaded(null);
            }}
          >
            <Close color="primary" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-full m-0 overflow-y-scroll flex-grow bg-lite ">
        {isMsgLoaded === null ? (
          <div className="text-black w-full h-full content-center text-center text-6xl flex items-center justify-center">
            <div className="glass-card p-8 flex flex-col items-center gap-4 shadow-xl animate-scale-in">
              <p className="text-darkest text-2xl font-medium">Let's start the chat!</p>
              <p className="text-darker text-lg">Select a contact to begin messaging</p>
            </div>
          </div>
        ) : (
          <>
            {!isMsgLoaded ? (
              <div className="w-full h-full flex flex-col justify-center items-center bg-lite/90">
                <CustomLoader size="xl" color="dark" />
                <p className="font-bold text-3xl mt-4 text-center text-darkest font-sans animate-pulse">
                  Loading Your Messages
                </p>
              </div>
            ) : (
              <div className="w-full h-full p-2 overflow-scroll">
                <div className="flex flex-col gap-5">
                  {allMsg.length === 0 ? (
                    <div className="text-black w-full h-full content-center text-center text-3xl flex items-center justify-center min-h-[60vh]">
                      <div className="glass-card p-6 bg-lite/50 border-lite shadow-lg animate-scale-in">
                        <p>Send a message to start conversation!</p>
                      </div>
                    </div>
                  ) : (
                    organizedMessages.map((item, index) => {
                      if (item.type === "divider") {
                        return <DateDivider key={`date-${index}`} date={item.date} />;
                      } else {
                        return (
                          <Message
                            key={`msg-${index}`}
                            getFormattedDate={getFormattedDate}
                            currentChat={currentChat}
                            msg={item.data}
                          />
                        );
                      }
                    })
                  )}
                  <div ref={messageEndRef} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {tempImg ? (
        <div className="relative bg-darkest/80 p-4 backdrop-blur object-contain">
          <div className="w-full max-h-full flex justify-center">
            <div className="relative rounded-xl overflow-hidden border-2 border-accent/70 shadow-lg">
              <img className="h-[200px] w-[200px] object-cover" src={message} alt="tempImg" />
            </div>
          </div>
          <IconButton
            className="absolute bottom-3 right-3 bg-accent/80 hover:bg-accent transition-colors"
            sx={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
            }}
            onClick={HandleTempImg}
          >
            {isTempImgSent ? (
              <Send className="text-white" />
            ) : (
              <CustomLoader size="sm" color="white" />
            )}
          </IconButton>
          <IconButton
            className="absolute top-3 right-3 bg-darker/80 hover:bg-darker transition-colors"
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
            }}
            onClick={() => {
              setTempImg(false);
              setMessage("");
            }}
          >
            <Close className="text-white" />
          </IconButton>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center m-0 relative p-2 ${
            currentChat ? "" : "hidden"
          } bg-darkest/95 border-t border-lite/10`}
        >
          <div>
            <IconButton
              onClick={() => {
                setIsPickerVisible(!isPickerVisible);
              }}
              className="hover:bg-lite/10 transition-colors"
            >
              {isPickerVisible ? (
                <Close className="text-accent" />
              ) : (
                <EmojiEmotions className="text-accent" />
              )}
            </IconButton>
            <div className="absolute bottom-16 z-10">
              {isPickerVisible && (
                <EmojiPicker
                  open={isPickerVisible}
                  onEmojiClick={(Emoji) => {
                    setMessage(message + Emoji.emoji);
                  }}
                  searchPlaceHolder={message}
                  skinTonesDisabled={false}
                  searchDisabled={false}
                  theme="dark"
                />
              )}
            </div>
          </div>
          <input
            className="rounded-xl outline-none p-3 flex-grow bg-lite/10 text-litest border border-lite/20 focus:ring-2 focus:ring-liter transition-all mx-2"
            onKeyDown={(e) => {
              if (e.key !== "Enter") {
                return;
              }
              HandleSend();
            }}
            readOnly={currentChat ? false : true}
            value={message}
            autoFocus={currentChat ? true : false}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onFocus={() => {
              setIsPickerVisible(false);
            }}
            type="text"
            placeholder="Send Message..."
          />
          <Tooltip title="Send">
            <IconButton 
              onClick={HandleSend}
              className="bg-accent/80 hover:bg-accent text-white transition-colors"
            >
              {isMessageSent ? (
                <Send className="text-white" />
              ) : (
                <CustomLoader size="sm" color="white" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Only Images Supported Now ">
            <IconButton
              onClick={() => {
                ImageToSend.current.click();
              }}
              className="hover:bg-lite/10 transition-colors ml-1"
            >
              <AttachFile className="text-accent" />
              <input
                ref={ImageToSend}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={SendImageToUser}
              />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
