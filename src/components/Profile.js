import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
    const { user, logout } = useAuth()
    return (
        <>
            <span className='block'>{user.username}</span>
            <span className='block'>{user.email}</span>
            <button onClick={logout}>logout</button>
        </>
    )
}

export default Profile