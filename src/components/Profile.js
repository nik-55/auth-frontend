import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authAxios } from '../api/customAxios'
import { useNavigate } from 'react-router-dom'
import { authConstant } from '../constants/authConstant'

const Profile = () => {
    const [error, setError] = useState("")
    const { user, dispatch } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await authAxios.get("/logout")
            localStorage.setItem("jwt_token", "")
            dispatch({ type: authConstant.AUTH, payload: { auth: false } })
            dispatch({ type: authConstant.USER, payload: { user: null } })
            navigate("/login", { replace: true })
        }
        catch (error) {
            const err = error?.response?.data || error;
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