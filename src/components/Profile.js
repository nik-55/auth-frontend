import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {

    const { user, logout } = useAuth()
    const [error, setError] = useState("")

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.status === "error") throw new Error(res.message)
        }
        catch (err) {
            setError(err?.message || "logout failed")
        }
    }
    return (
        <>
            <span className='block'>{user.username}</span>
            <span className='block'>{user.email}</span>
            <button onClick={handleLogout}>logout</button>
            <small className='error'>{error}</small>
        </>
    )
}

export default Profile