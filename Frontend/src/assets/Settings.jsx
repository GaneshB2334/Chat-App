import { Close, Delete, Edit, Person } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";

const Settings = ({
  setIsProfileOption,
  setIsLargeView,
  HandleProfileRemove,
  setProfile,
  profile,
}) => {
  const inputImage = useRef(null);

  const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1.5e6) {
      toast.error("File size should be less than 1.5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const newProfile = reader.result;
      setIsProfileOption(false);

      const toastId = toast.loading("Updating Profile...");
      try {
        const res = await axios.put(
          "https://chat-app-ku8j.onrender.com/api/users",
          { profile: newProfile },
          { withCredentials: true }
        );
        console.log(res.data);
        let user = JSON.parse(localStorage.getItem("chat-app-user"));
        user.profile = newProfile;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        setProfile(newProfile);
        toast.dismiss(toastId);
        toast.success("Profile Updated");
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Error in updating profile");
        console.log("Error in updating profile-->", err);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw] bg-[rgba(0,0,0,.7)] fixed top-0 left-0 ">
      <div className="h-[30%] w-[40%] max-md:w-[85%] max-md:h-[25%] bg-darkest rounded-xl flex flex-col justify-evenly items-center ">
        <div className="w-full flex flex-col gap-3 justify-evenly p-3 text-black font-bold font-sans relative">
          <IconButton
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
            }}
            onClick={() => setIsProfileOption(false)}
          >
            <Close />
          </IconButton>
          <button
            className="w-full text-center bg-darker py-3 rounded-xl flex gap-5 justify-center"
            onClick={() => {
              setIsProfileOption(false);
              setIsLargeView(true);
            }}
          >
            View Profile
            <Person />
          </button>
          <div className="w-full">
            <button
              className="w-full text-center bg-darker py-3 rounded-xl flex justify-center gap-5"
              onClick={() => inputImage.current.click()}
            >
              Change Profile
              <Edit />
            </button>
            <input
              ref={inputImage}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={handleProfile}
            />
          </div>
          <button
            className="w-full text-center bg-darker py-3 rounded-xl flex justify-center gap-5"
            onClick={HandleProfileRemove}
          >
            Remove Profile
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
