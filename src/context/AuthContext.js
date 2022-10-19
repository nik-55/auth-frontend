import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({})

    const login = async (email, pwd) => {
        setUser({ username: "Nikhil", email })
        setAuth(true)
        navigate("/profile", { replace: true })
    }

    const logout = () => {
        setAuth(false)
    }

    const value = { auth, user, login, logout }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export { useAuth, AuthProvider }