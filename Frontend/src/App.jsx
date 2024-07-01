import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'

const App = () => {
    return (
        <div className=''>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
            <Toaster position='top-center'/>
        </div>
    )
}

export default App
