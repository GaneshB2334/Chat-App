import { Avatar } from '@mui/material'
import React from 'react'

const User = (props) => {
    return (
        <div className='flex p-2 cursor-pointer justify-center items-center max-w-full gap-5 overflow-hidden h-[120px] hover:bg-darker active:bg-darkest transition-all' onClick={(e) => { props.LoadCurrentChat(e, props.index) }}>
            <Avatar sx={{
                height: "90px",
                width: "90px"
            }} src={props.Avatar ? props.Avatar : null} />

            <div className='flex shrink-0 flex-col flex-grow justify-evenly overflow-hidden w-[70%]'>
                <p className='text-2xl text-nowrap overflow-hidden overflow-ellipsis w-[100%] '>{props.Username}</p>
                <p className='text-md text-lite text-nowrap overflow-hidden overflow-ellipsis w-[100%] '>{props.Message}</p>
            </div>
        </div>
    )
}

export default User
