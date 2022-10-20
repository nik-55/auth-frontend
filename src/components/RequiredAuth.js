import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RequiredAuth = ({ children }) => {
    const { auth, loading } = useAuth()
    return (
        <>{loading ? "loading..." : (auth ? children : <Navigate replace to={"/login"} />)}</>
    )
}

export default RequiredAuth