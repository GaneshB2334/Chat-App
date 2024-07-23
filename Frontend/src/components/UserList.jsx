import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import User from "./User";

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
      } max-md:h-[85vh] `}
    >
      <div className="w-full p-2 m-0 h-[70px] content-center ">
        <input
          type="text"
          placeholder="Search..."
          value={Search}
          onChange={HandleSearch}
          className="w-full p-3 rounded-xl outline-none text-black"
        />
      </div>

      <div className="w-full h-[75vh] p-1 overflow-scroll">
        {!loading ? (
          Search ? (
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
          <div className="w-full h-full flex flex-col items-center gap-5 justify-center text-litest ">
            <Stack
              px={2}
              spacing={2}
              width={"100%"}
              direction="row"
              alignItems="center"
            >
              <Skeleton variant="circular" width={90} height={90} />
              <Box width={"60%"}>
                <Typography width={"100%"} variant="h6">
                  <Skeleton width="100%" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width="40%" />
                </Typography>
              </Box>
            </Stack>
            <Stack
              px={2}
              spacing={2}
              width={"100%"}
              direction="row"
              alignItems="center"
            >
              <Skeleton variant="circular" width={90} height={90} />
              <Box width={"60%"}>
                <Typography width={"100%"} variant="h6">
                  <Skeleton width="100%" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width="40%" />
                </Typography>
              </Box>
            </Stack>
            <Stack
              px={2}
              spacing={2}
              width={"100%"}
              direction="row"
              alignItems="center"
            >
              <Skeleton variant="circular" width={90} height={90} />
              <Box width={"60%"}>
                <Typography width={"100%"} variant="h6">
                  <Skeleton width="100%" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width="40%" />
                </Typography>
              </Box>
            </Stack>
            <Stack
              px={2}
              spacing={2}
              width={"100%"}
              direction="row"
              alignItems="center"
            >
              <Skeleton variant="circular" width={90} height={90} />
              <Box width={"60%"}>
                <Typography width={"100%"} variant="h6">
                  <Skeleton width="100%" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width="40%" />
                </Typography>
              </Box>
            </Stack>
            <Stack
              px={2}
              spacing={2}
              width={"100%"}
              direction="row"
              alignItems="center"
            >
              <Skeleton variant="circular" width={90} height={90} />
              <Box width={"60%"}>
                <Typography width={"100%"} variant="h6">
                  <Skeleton width="100%" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width="40%" />
                </Typography>
              </Box>
            </Stack>
            <Stack
              px={2}
              spacing={2}
              width={"100%"}
              direction="row"
              alignItems="center"
            >
              <Skeleton variant="circular" width={90} height={90} />
              <Box width={"60%"}>
                <Typography width={"100%"} variant="h6">
                  <Skeleton width="100%" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width="40%" />
                </Typography>
              </Box>
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
