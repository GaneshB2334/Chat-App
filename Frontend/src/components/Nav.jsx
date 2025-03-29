
import { Logout, Settings } from '@mui/icons-material'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import React from 'react'

const Nav = ({ setIsProfileOption, setConfirmState, profile, username }) => {
    return (
        <div className='bg-darkest h-20 px-4 m-5 flex items-center justify-between overflow-hidden rounded-full shadow-lg border border-lite/20 backdrop-blur-sm'>
            <div className='flex items-center gap-5'>
                <Tooltip title="View Profile">
                    <Avatar 
                        sx={{
                            height: "4rem",
                            width: "4rem",
                            border: "2px solid #9DB4C0"
                        }} 
                        src={profile ? profile : null} 
                        className="cursor-pointer hover:scale-105 transition-transform"
                    />
                </Tooltip>
                <div className='overflow-hidden overflow-ellipsis text-white text-2xl max-md:text-xl'>
                    <Tooltip title={username}>
                        <h1 className='font-semibold text-nowrap overflow-hidden text-ellipsis'>{username}</h1>
                    </Tooltip>
                </div>
            </div>
            <div className='flex gap-3'>
                <Tooltip title="Settings">
                    <IconButton 
                        onClick={() => { setIsProfileOption(true) }}
                        className="bg-lite/10 hover:bg-lite/20 transition-colors"
                    >
                        <Settings className="text-white" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                    <IconButton 
                        onClick={() => { setConfirmState(true) }}
                        className="bg-lite/10 hover:bg-lite/20 transition-colors"
                    >
                        <Logout className="text-white" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Nav
