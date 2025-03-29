
import { Box, Typography } from "@mui/material";
import React from "react";
import User from "./User";
import { Search as SearchIcon } from "@mui/icons-material";
import CustomLoader from "./CustomLoader";

const UserList = ({
  Search,
  loading,
  LoadCurrentChat,
  HandleSearch,
  allUsers,
  searchResult,
  currentChat,
}) => {
  return (
    <div
      className={`text-white h-[85vh] bg-darkest w-[30%] max-xl:w-[40%] max-lg:w-[35%] ${
        currentChat ? "max-md:hidden" : "max-md:w-[90%]"
      } max-md:h-[85vh] border-r border-lite/10 shadow-lg`}
    >
      <div className="w-full p-3 m-0 h-[70px] flex items-center justify-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search users..."
            value={Search}
            onChange={HandleSearch}
            className="w-full p-3 pl-10 rounded-xl outline-none bg-lite/10 text-litest border border-lite/20 focus:ring-2 focus:ring-liter transition-all"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lite" />
        </div>
      </div>

      <div className="w-full h-[75vh] overflow-scroll">
        {!loading ? (
          Search ? (
            searchResult.length > 0 ? (
              searchResult.map((user, index) => {
                return (
                  <User
                    LoadCurrentChat={LoadCurrentChat}
                    key={index}
                    index={index}
                    Avatar={user.profile}
                    Username={user.fullname}
                    Message="Tap to chat!"
                  />
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <p className="text-lite text-lg">No users found</p>
                <p className="text-lite/70 text-sm">Try a different search term</p>
              </div>
            )
          ) : (
            allUsers.map((user, index) => {
              return (
                <User
                  LoadCurrentChat={LoadCurrentChat}
                  key={index}
                  index={index}
                  Avatar={user.profile}
                  Username={user.fullname}
                  Message="Tap to chat!"
                />
              );
            })
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center gap-6 justify-center text-litest p-4">
            <CustomLoader size="xl" color="accent" />
            <p className="text-lite text-lg animate-pulse">Loading users...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
