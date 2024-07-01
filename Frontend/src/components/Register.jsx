import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Avatar } from '@mui/material';

export default function Register() {
  const navigate = useNavigate();

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
    if (!formdata.username || !formdata.password || !formdata.fullname || !formdata.profile) {
      toast.error('Please fill all the fields');
      return;
    }
    const toastId = toast.loading("Loading...")
    await axios.post('http://localhost:5000/api/auth/register', formdata)
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
            <input className='p-3 rounded-md w-full outline-none' type="text" required id='fullname' name='fullname' value={formdata.fullname} onChange={handleChange} />
          </div>
          <div className='text-xl flex flex-col gap-2'>
            <label htmlFor="username">
              Username
            </label>
            <input className='p-3 rounded-md w-full outline-none' type="text" required id='username' name='username' value={formdata.username} onChange={handleChange} />
          </div>
          <div className='text-xl flex flex-col gap-2'>
            <label htmlFor="fullname">
              Password
            </label>
            <input className='p-3 rounded-md w-full outline-none' type="password" required id='password' name='password' value={formdata.password} onChange={handleChange} />
          </div>
          <div className='text-xl flex flex-col gap-2'>
            <label htmlFor="cnfPassword">
              Confirm Password
            </label>
            <input className='p-3 rounded-md w-full outline-none' type="password" required id='cnfPassword' name='cnfPassword' value={formdata.cnfPassword} onChange={handleChange} />
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