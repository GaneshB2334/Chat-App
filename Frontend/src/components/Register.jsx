import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Avatar, IconButton } from '@mui/material';
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';

export default function Register() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCnfPasswordVisible, setIsCnfPasswordVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('chat-app-user');
    if (token) {
      navigate('/home');
    }
  }, []);

  const [formdata, setFormdata] = useState({
    profile: '',
    fullname: '',
    username: '',
    password: '',
    cnfPassword: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.cnfPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!formdata.username || !formdata.password || !formdata.fullname ) {
      toast.error('Please fill all the fields');
      return;
    }
    const toastId = toast.loading("Loading...")
    await axios.post('https://chat-app-ku8j.onrender.com/api/auth/register', formdata,{
      withCredentials: true
    })
      .then((result) => {
        console.log(result.data);
        if (result.data === "AlreadyPresent") {
          toast.dismiss(toastId);
          toast.error('User already exists Please login');
        }
        else {
          toast.dismiss(toastId)
          toast.success('User registered successfully');
          navigate("/home")
        }
      }).catch((err) => {
        toast.dismiss(toastId);
        toast.error('An error occurred. Please try again.');
        console.log(err);
      });
  }

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const HandleProfile = (e) => {
    const file = e.target.files[0]
    if (file.size > 2e6) {
      toast.error('File size should be less than 2MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormdata({ ...formdata, profile: reader.result })
    }
    reader.readAsDataURL(file)

  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className='shadow-md p-5 bg-darkest text-litest'>
        <h1 className='w-full text-center text-4xl  my-4 font-sans'>Register</h1>
        <form>
          <div className='flex w-full justify-center'>
            <div className='relative'>
              <input className='absolute h-[100px] w-[100px] rounded-full' type="file" accept='image/*' onChange={HandleProfile} />
              <Avatar sx={{
                height: "100px",
                width: "100px",
                pointerEvents: "none",
              }} src={formdata.profile ? formdata.profile : null} />
            </div>
          </div>
          <div className='text-xl flex flex-col gap-2'>
            <label htmlFor="fullname">
              Fullname
            </label>
            <input className='text-black p-3 rounded-md w-full outline-none' type="text" required id='fullname' name='fullname' value={formdata.fullname} onChange={handleChange} />
          </div>
          <div className='text-xl flex flex-col gap-2'>
            <label htmlFor="username">
              Username
            </label>
            <input className='text-black p-3 rounded-md w-full outline-none' type="text" required id='username' name='username' value={formdata.username} onChange={handleChange} />
          </div>
          <div className='text-xl flex flex-col gap-2'>
            <label htmlFor="fullname">
              Password
            </label>
            <div className='w-full relative'>
              <input className='p-3 rounded-md w-[90%] outline-none text-black' type={isPasswordVisible ? 'text' : 'password'} required id='password' name='password' value={formdata.password} onChange={handleChange} />
              <div className='absolute right-0 top-2 w-[10%]'>
                <IconButton
                  sx={{
                    color: "white"
                  }}
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  {
                    isPasswordVisible ?
                      <RemoveRedEye />
                      :
                      <VisibilityOff />
                  }
                </IconButton>
              </div>
            </div>
          </div>
          <div className='text-xl flex flex-col gap-2'>
            <label htmlFor="fullname">
              Confirm Password
            </label>
            <div className='w-full relative'>
              <input className='p-3 rounded-md w-[90%] outline-none text-black' type={isCnfPasswordVisible ? 'text' : 'password'} required id='cnfPassword' name='cnfPassword' value={formdata.cnfPassword} onChange={handleChange} />
              <div className='absolute right-0 top-2 w-[10%]'>
                <IconButton
                  sx={{
                    color: "white"
                  }}
                  onClick={() => {
                    setIsCnfPasswordVisible(!isCnfPasswordVisible);
                  }}
                >
                  {
                    isCnfPasswordVisible ?
                      <RemoveRedEye />
                      :
                      <VisibilityOff />
                  }
                </IconButton>
              </div>
            </div>
          </div>

          <button type='submit' className='w-full text-center py-3 bg-darker my-5' onClick={handleRegister}>
            Register
          </button>
          <Link to='/' className='underline'>Already have an account? Login</Link>
        </form>
      </div>
    </div >
  );
}
