import { Logout, Notifications, Person, Settings } from '@mui/icons-material'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import React from 'react'

const Nav = ({ setIsProfileOption, setConfirmState, profile, username }) => {
    return (
        <div className='bg-darkest h-[80px] px-2 m-5 flex items-center justify-around overflow-hidden rounded-full'>
            <div className='flex-grow text-white text-center text-3xl font-sans flex items-center gap-5'>
                <Tooltip title="View Profile">
                    <Avatar sx={{
                        height: "70px",
                        width: "70px"
                    }} src={profile ? profile : null} />
                </Tooltip>
                <Tooltip title={username}>
                    <h1 className='max-md:text-2xl text-nowrap overflow-hidden text-ellipsis'>{username}</h1>
                </Tooltip>
            </div>
            <div className='flex gap-5'>
                <Tooltip title="Notifications">
                    <IconButton>
                        <Notifications sx={{
                            color:"white"
                        }}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                    <IconButton onClick={() => { setIsProfileOption(true) }}>
                        <Settings sx={{
                            color: "white",
                        }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                    <IconButton onClick={() => { setConfirmState(true) }}>
                        <Logout sx={{
                            color: "white",
                        }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Nav
