import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("chat-app-user");
    if (token) {
      navigate("/home");
    }
  }, []);

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = formdata;
    const toastId = toast.loading("Logging in...");
    try {
      const result = await axios.post(
        "https://chat-app-ku8j.onrender.com/api/auth/login",
        { username, password },
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      if (result.data.message === "Invalid username") {
        toast.dismiss(toastId);
        toast.error("Invalid username");
      } else if (result.data.message === "Invalid password") {
        toast.dismiss(toastId);
        toast.error("Invalid password");
      } else {
        toast.dismiss(toastId);
        toast.success("Login successful");

        localStorage.setItem("chat-app-user", JSON.stringify(result.data));
        setAuthUser(result.data);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-[#d88c8c] text-6xl font-mono [text-shadow:_10px_10px_2px_rgb(0_0_0_/_50%)] m-5">
        ChimeChat
      </h1>
      <div className="shadow-md p-5 bg-darkest text-litest rounded-xl">
        <h1 className="w-full text-center text-4xl  my-4 font-sans">Login</h1>
        <form>
          <div className="text-xl flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="p-3 rounded-md w-full outline-none text-black"
              type="text"
              required
              autoFocus
              id="username"
              name="username"
              value={formdata.username}
              onChange={handleChange}
            />
          </div>
          <div className="text-xl flex flex-col gap-2">
            <label htmlFor="fullname">Password</label>
            <div className="w-full relative">
              <input
                className="p-3 rounded-md w-[90%] outline-none text-black"
                type={isPasswordVisible ? "text" : "password"}
                required
                id="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
              />
              <div className="absolute right-0 top-2 w-[10%]">
                <IconButton
                  sx={{
                    color: "white",
                  }}
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  {isPasswordVisible ? <RemoveRedEye /> : <VisibilityOff />}
                </IconButton>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-center py-3 bg-darker my-5 rounded-md text-xl text-white shadow-black shadow-md hover:shadow-xl hover:shadow-black transition-all"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link to="/register" className="underline cursor-pointer">
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
}
