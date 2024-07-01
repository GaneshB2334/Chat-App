import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const ConfirmBlock = ({ setConfirmState, header }) => {
    const navigate = useNavigate();
    const HandleLogout = async () => {
        await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        localStorage.removeItem("chat-app-user");
        navigate("/");
    }
    return (
        <div className='flex items-center justify-center h-[100vh] w-[100vw] bg-[#3d3c3c89] fixed top-0 left-0'>
            <div className='h-[30%] w-[40%] max-md:w-[85%] max-md:h-[25%] bg-[#241d50] rounded-xl flex flex-col justify-evenly items-center '>
                <p className='text-white font-semibold text-2xl '>{header}</p>
                <div className='w-full flex justify-evenly'>
                    <Button variant='contained' onClick={() => { setConfirmState(false) }}>Cancle</Button>
                    <Button variant='outlined' onClick={HandleLogout}>Confirm</Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBlock
