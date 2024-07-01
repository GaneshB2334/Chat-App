import { Close } from '@mui/icons-material'
import {  IconButton } from '@mui/material'
import React from 'react'

const LargeView = ({ setIsLargeView, profile }) => {
    return (
        <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,.75)] '>
            <div className='h-[60vh] max-md:h-[40vh] w-[70vw] max-md:w-[90vw] bg-black flex justify-center items-center relative rounded-xl'>
                <img className='object-contain w-full h-full ' src={profile} alt="" />
                <IconButton sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    color: "white"
                }}
                    onClick={() => {
                        setIsLargeView(false);
                    }}>
                    <Close />
                </IconButton>
            </div>
        </div>
    )
}

export default LargeView
