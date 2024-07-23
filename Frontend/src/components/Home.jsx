import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmBlock from "../assets/ConfirmBlock.jsx";
import LargeView from "../assets/LargeView.jsx";
import Settings from "../assets/Settings.jsx";
import axios from "axios";
import Nav from "./Nav.jsx";
import UserList from "./UserList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import useGetAllUsers from "../hooks/useGetAllUsers.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useAuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const [Search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");

  const [ConfirmState, setConfirmState] = useState(false);
  const [isLargeView, setIsLargeView] = useState(false);
  const [isProfileOption, setIsProfileOption] = useState(false);

  const [allMsg, setAllMsg] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const [isMsgLoaded, setIsMsgLoaded] = useState(null);
  const [isMessageSent, setIsMessageSent] = useState(true);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const ImageToSend = useRef(null);
  const { loading, allUsers } = useGetAllUsers();

  const socket = useMemo(
    () =>
      io("https://chat-app-ku8j.onrender.com/", {
        withcredentials: true,
        query: {
          userId: authUser?._id,
        },
      }),
    []
  );

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("chat-app-user"));
    if (!token) {
      navigate("/");
    } else {
      setProfile(token.profile);
      setUsername(token.fullname);
      console.log(allUsers);

      socket.on("connect", () => {
        console.log("Connected to server", socket.id);
      });

      socket.on("recieve-message", (msg) => {
        console.log("Message recieved-->", msg);
        if (currentChat._id===msg.senderId) {
            setAllMsg((prevMsgs) => [...prevMsgs, msg]);
        }
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
    return () => {
      console.log("Disconnected from server");
    };
  }, []);

  const HandleSearch = (e) => {
    setSearch(e.target.value);
    if (allUsers) {
      const results = allUsers.filter((user) => {
        return user.fullname
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchResult((prev) => [...results]);
      console.log(results);
    }
  };

  const LoadCurrentChat = (e, index) => {
    if (currentChat === allUsers[index]) {
      return;
    }
    setCurrentChat(allUsers[index]);
    setIsMsgLoaded(false);
    (async () => {
      await axios
        .get(`https://chat-app-ku8j.onrender.com/api/messages/${allUsers[index]._id}`, { withCredentials: true })
        .then((res) => {
          setAllMsg(res.data.messages);
          console.log(res.data.messages);
        })
        .catch((err) => console.log("Error in getting messages-->", err))
        .finally(() => setIsMsgLoaded(true));
    })();
  };

  const HandleProfileChange = async () => {
    setIsProfileOption(false);
    console.log("Profile Changed");
  };

  const HandleProfileRemove = async () => {
    setIsProfileOption(false);
    toast.error("This is not functional yet.");
    console.log("Profile Removed");
  };

  const HandleSend = async () => {
    if (!message || message === " ") {
      return;
    }
    setIsMessageSent(false);

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
        setIsMessageSent(true);
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

  return (
    <>
      <div className="flex flex-col">
        <Nav
          setIsProfileOption={setIsProfileOption}
          profile={profile}
          setConfirmState={setConfirmState}
          username={username}
        />
        <div className="flex justify-center">
          <UserList
            currentChat={currentChat}
            HandleSearch={HandleSearch}
            LoadCurrentChat={LoadCurrentChat}
            Search={Search}
            allUsers={allUsers}
            loading={loading}
            searchResult={searchResult}
          />

          <ChatWindow
            HandleSend={HandleSend}
            setAllMsg={setAllMsg}
            isMessageSent={isMessageSent}
            allMsg={allMsg}
            setIsMsgLoaded={setIsMsgLoaded}
            setIsMessageSent={setIsMessageSent}
            ImageToSend={ImageToSend}
            currentChat={currentChat}
            isPickerVisible={isPickerVisible}
            message={message}
            setMessage={setMessage}
            setCurrentChat={setCurrentChat}
            setIsPickerVisible={setIsPickerVisible}
            isMsgLoaded={isMsgLoaded}
          />
        </div>
      </div>
      {ConfirmState && (
        <ConfirmBlock
          setConfirmState={setConfirmState}
          header="Do you Want to Logout ?"
        />
      )}
      {isLargeView && (
        <LargeView setIsLargeView={setIsLargeView} profile={profile} />
      )}
      {isProfileOption && (
        <Settings
          setIsProfileOption={setIsProfileOption}
          setIsLargeView={setIsLargeView}
          HandleProfileChange={HandleProfileChange}
          HandleProfileRemove={HandleProfileRemove}
          setProfile={setProfile}
          profile={profile}
        />
      )}
    </>
  );
};

export default Home;
