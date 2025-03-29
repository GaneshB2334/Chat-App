import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import { RemoveRedEye, VisibilityOff, CloudUpload } from "@mui/icons-material";
import Skeleton from "./Skeleton";

export default function Register() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCnfPasswordVisible, setIsCnfPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("chat-app-user");
    if (token) {
      navigate("/home");
    }
  }, []);

  const [formdata, setFormdata] = useState({
    profile: "",
    fullname: "",
    username: "",
    password: "",
    cnfPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.cnfPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formdata.username || !formdata.password || !formdata.fullname) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Creating your account...");
    await axios
      .post("https://chat-app-ku8j.onrender.com/api/auth/register", formdata, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data === "AlreadyPresent") {
          toast.dismiss(toastId);
          toast.error("User already exists. Please login");
        } else {
          toast.dismiss(toastId);
          toast.success("Account created successfully");
          navigate("/home");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId);
        toast.error("An error occurred. Please try again.");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const HandleProfile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2e6) {
      toast.error("File size should be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormdata({ ...formdata, profile: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const ButtonContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center space-x-2">
            <div className="space-y-2 animate-pulse">
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="space-y-2 animate-pulse">
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="space-y-2 animate-pulse">
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <span className="ml-2">Creating account...</span>
          </div>
        </div>
      );
    }
    return "Register";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkest overflow-auto">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-darker/20 to-transparent opacity-50 pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center justify-center overflow-auto max-h-screen w-full">
        <h1 className="text-accent text-6xl font-bold mb-6 [text-shadow:_4px_4px_10px_rgb(0_0_0_/_40%)]">
          ChimeChat
        </h1>

        <div className="glass-card p-6 max-h-screen overflow-y-auto">
          <h1 className="w-full text-center text-4xl my-4 font-bold text-litest">
            Register
          </h1>

          <form className="space-y-4">
            <div className="flex w-full justify-center mb-4">
              <div className="relative group">
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  type="file"
                  accept="image/*"
                  onChange={HandleProfile}
                  id="profile-upload"
                  disabled={isLoading}
                />
                <div className="relative">
                  {isLoading && !formdata.profile ? (
                    <Skeleton className="h-24 w-24 rounded-full" />
                  ) : (
                    <Avatar
                      sx={{
                        height: "100px",
                        width: "100px",
                        border: "3px solid #9DB4C0",
                      }}
                      src={formdata.profile ? formdata.profile : null}
                    />
                  )}
                  <div className="absolute inset-0 bg-darkest/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <CloudUpload className="text-white text-3xl" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xl flex flex-col gap-2">
              <label htmlFor="fullname" className="text-litest">
                Full Name
              </label>
              {isLoading ? (
                <Skeleton className="h-12 w-full rounded-xl" />
              ) : (
                <input
                  className="input-primary"
                  type="text"
                  autoFocus
                  required
                  id="fullname"
                  name="fullname"
                  value={formdata.fullname}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              )}
            </div>

            <div className="text-xl flex flex-col gap-2">
              <label htmlFor="username" className="text-litest">
                Username
              </label>
              {isLoading ? (
                <Skeleton className="h-12 w-full rounded-xl" />
              ) : (
                <input
                  className="input-primary"
                  type="text"
                  required
                  id="username"
                  name="username"
                  value={formdata.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              )}
            </div>

            <div className="text-xl flex flex-col gap-2">
              <label htmlFor="password" className="text-litest">
                Password
              </label>
              {isLoading ? (
                <Skeleton className="h-12 w-full rounded-xl" />
              ) : (
                <div className="w-full relative">
                  <input
                    className="input-primary pr-12"
                    type={isPasswordVisible ? "text" : "password"}
                    required
                    id="password"
                    name="password"
                    value={formdata.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <IconButton
                      className="text-litest"
                      onClick={() => {
                        setIsPasswordVisible(!isPasswordVisible);
                      }}
                      disabled={isLoading}
                    >
                      {isPasswordVisible ? (
                        <RemoveRedEye className="text-litest" />
                      ) : (
                        <VisibilityOff className="text-litest" />
                      )}
                    </IconButton>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xl flex flex-col gap-2">
              <label htmlFor="cnfPassword" className="text-litest">
                Confirm Password
              </label>
              {isLoading ? (
                <Skeleton className="h-12 w-full rounded-xl" />
              ) : (
                <div className="w-full relative">
                  <input
                    className="input-primary pr-12"
                    type={isCnfPasswordVisible ? "text" : "password"}
                    required
                    id="cnfPassword"
                    name="cnfPassword"
                    value={formdata.cnfPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <IconButton
                      className="text-litest"
                      onClick={() => {
                        setIsCnfPasswordVisible(!isCnfPasswordVisible);
                      }}
                      disabled={isLoading}
                    >
                      {isCnfPasswordVisible ? (
                        <RemoveRedEye className="text-litest" />
                      ) : (
                        <VisibilityOff className="text-litest" />
                      )}
                    </IconButton>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 bg-accent my-5 rounded-md text-xl text-white font-bold shadow-md hover:shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center"
              onClick={handleRegister}
              disabled={isLoading}
            >
              <ButtonContent />
            </button>

            <div className="text-center">
              <Link
                to="/"
                className="text-litest hover:text-white underline transition-colors"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
