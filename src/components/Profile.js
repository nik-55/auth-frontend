import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { authAxios } from '../api/customAxios'
import { useNavigate } from 'react-router-dom'
import { authConstant } from '../constants/authConstant'

const Profile = () => {
    const btnRef = useRef()
    const [error, setError] = useState("")
    const { user, dispatch } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        btnRef.current.disabled = true
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
        btnRef.current.disabled = false
    }

    return (
        <div className='general-body bg'>
            <span className='block'>{user.username}</span>
            <span className='block'>{user.email}</span>
            <button ref={btnRef} className='block' onClick={handleLogout}>Logout</button>
            {error !== "" && <small className='error'>{error}</small>}
        </div>
    )
}

export default Profile