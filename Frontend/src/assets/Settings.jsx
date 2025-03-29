
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-darkest/80 backdrop-blur-sm transition-all">
      <div className="w-[450px] max-w-[90%] bg-darker rounded-xl shadow-custom-lg border border-lite/20 transform transition-all duration-200 animate-fade-in">
        <div className="p-5 relative">
          <div className="flex justify-between items-center mb-5 pb-2 border-b border-lite/20">
            <h2 className="text-xl font-bold text-litest">Profile Options</h2>
            <IconButton
              className="text-litest hover:text-accent transition-colors"
              onClick={() => setIsProfileOption(false)}
            >
              <Close className="text-litest hover:text-accent" />
            </IconButton>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              className="w-full text-center bg-darkest hover:bg-black/50 text-litest py-3 px-4 rounded-xl flex items-center gap-3 justify-center transition-all duration-200"
              onClick={() => {
                setIsProfileOption(false);
                setIsLargeView(true);
              }}
            >
              <Person className="text-lite" />
              <span>View Profile</span>
            </button>
            
            <div className="w-full">
              <button
                className="w-full text-center bg-darkest hover:bg-black/50 text-litest py-3 px-4 rounded-xl flex items-center gap-3 justify-center transition-all duration-200"
                onClick={() => inputImage.current.click()}
              >
                <Edit className="text-lite" />
                <span>Change Profile</span>
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
              className="w-full text-center bg-darkest hover:bg-black/50 text-litest py-3 px-4 rounded-xl flex items-center gap-3 justify-center transition-all duration-200"
              onClick={HandleProfileRemove}
            >
              <Delete className="text-accent" />
              <span>Remove Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
