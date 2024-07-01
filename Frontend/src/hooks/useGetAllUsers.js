import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([])
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await axios.get('http://localhost:5000/api/users', { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    setAllUsers(res.data);
                }
                ).catch((err) => {
                    console.log(err);
                }).finally(() => setLoading(false))
        })()
    }, [])

    return { loading, allUsers }
}

export default useGetAllUsers
