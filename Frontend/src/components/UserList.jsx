import React from 'react'
import User from './User'
import { CircularProgress } from '@mui/material'

const UserList = ({ Search, loading, LoadCurrentChat, HandleSearch, allUsers, searchResult }) => {
    return (
        <div className=' border-2 text-white h-[85vh] bg-darkest border-[#444343] border-r-0 w-[30%] max-xl:w-[40%] max-lg:w-[45%] max-md:w-[90%] '>
            <div className='w-full p-2 m-0 h-[70px] content-center '>
                <input type="text" placeholder='Search...' value={Search} onChange={HandleSearch} className='w-full p-3 rounded-xl outline-none text-black' />
            </div>

            <div className='w-full p-1 overflow-scroll h-[75vh] max-md:h-[80vh] shadow-inner shadow-black'>
                {!loading ?

                    Search ?
                        searchResult.map((user, index) => {
                            return <User LoadCurrentChat={LoadCurrentChat} key={index} index={index} Avatar={user.profile} Username={user.fullname} Message="Tap to chat!" />
                        })
                        :
                        allUsers.map((user, index) => {
                            return <User LoadCurrentChat={LoadCurrentChat} key={index} index={index} Avatar={user.profile} Username={user.fullname} Message="Tap to chat!" />
                        })
                    :
                    <div className='w-full h-full flex flex-col items-center gap-2 justify-center text-litest '>
                        <CircularProgress color='inherit' />
                        <p className='w-full text-center text-3xl'>Getting your friends</p>
                        <p className='w-full text-center text-3xl'>Please wait!</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserList
