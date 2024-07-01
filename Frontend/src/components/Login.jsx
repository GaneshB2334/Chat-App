import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const {setAuthUser} = useAuthContext();

    useEffect(() => {
        const token = localStorage.getItem('chat-app-user');
        if (token) {
            navigate('/home');
        }
    }, []);

    const [formdata, setFormdata] = useState({
        username: '',
        password: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = formdata;
        const toastId = toast.loading("Logging in...")
        try {
            const result = await axios.post('http://localhost:5000/api/auth/login', { username, password }, {
                withCredentials: true
            });
            console.log(result.data);
            if (result.data.message === "Invalid username") {
                toast.dismiss(toastId);
                toast.error('Invalid username');
            } else if (result.data.message === "Invalid password") {
                toast.dismiss(toastId);
                toast.error('Invalid password');
            }
            else {
                toast.dismiss(toastId);
                toast.success('Login successful');

                localStorage.setItem("chat-app-user", JSON.stringify(result.data));
                setAuthUser(result.data);
                
                setTimeout(() => {
                    navigate('/home')
                }, 1000);
            }
        } catch (err) {
            console.error(err);
            toast.dismiss(toastId)
            toast.error('An error occurred. Please try again.');
        }
    }

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className='shadow-md p-5 bg-darkest text-litest rounded-xl'>
                <h1 className='w-full text-center text-4xl  my-4 font-sans'>Login</h1>
                <form>
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
                    <button type='submit' className='w-full text-center py-3 bg-darker my-5' onClick={handleLogin}>
                        Login
                    </button>
                    <Link to='/register' className='underline cursor-pointer'>Don't have an account? Register</Link>
                </form>
            </div>
        </div >
    );
}