
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
    if (!username || !password) {
      return toast.error("Please fill all fields");
    }
    
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
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-darkest">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-darker/20 to-transparent opacity-50"></div>
      
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-accent text-6xl font-bold mb-8 [text-shadow:_4px_4px_10px_rgb(0_0_0_/_40%)]">
          ChimeChat
        </h1>
        
        <div className="glass-card p-6 w-full max-w-md">
          <h1 className="w-full text-center text-4xl my-4 font-bold text-litest">Login</h1>
          
          <form className="space-y-5">
            <div className="text-xl flex flex-col gap-2">
              <label htmlFor="username" className="text-litest">Username</label>
              <input
                className="input-primary"
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
              <label htmlFor="password" className="text-litest">Password</label>
              <div className="w-full relative">
                <input
                  className="input-primary pr-12"
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  id="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <IconButton
                    className="text-litest"
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible);
                    }}
                  >
                    {isPasswordVisible ? <RemoveRedEye className="text-litest" /> : <VisibilityOff className="text-litest" />}
                  </IconButton>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full text-center py-3 bg-accent my-5 rounded-md text-xl text-white font-bold shadow-md hover:shadow-lg hover:bg-accent/90 transition-all"
              onClick={handleLogin}
            >
              Login
            </button>
            
            <div className="text-center">
              <Link to="/register" className="text-litest hover:text-white underline transition-colors">
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
