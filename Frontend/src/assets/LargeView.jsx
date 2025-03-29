
import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

const LargeView = ({ setIsLargeView, profile }) => {
    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-darkest/80 backdrop-blur-sm transition-all'>
            <div className='relative max-w-[90vw] max-h-[90vh] bg-darker rounded-xl shadow-custom-lg border border-lite/20 p-2 animate-scale-in'>
                <img 
                    className='object-contain max-w-[calc(90vw-20px)] max-h-[calc(90vh-20px)] rounded-lg' 
                    src={profile} 
                    alt="Profile" 
                />
                <IconButton 
                    className="absolute top-2 right-2 bg-darkest/70 hover:bg-accent/70 transition-all duration-200"
                    onClick={() => setIsLargeView(false)}
                >
                    <Close className="text-litest" />
                </IconButton>
            </div>
        </div>
    )
}

export default LargeView
