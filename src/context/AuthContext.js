import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAxios, basicAxios } from '../api/customAxios'

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const fetchUserDetails = async () => {
        try {
            if (localStorage.getItem("jwt_token")) {
                const response = await authAxios.get("/profile")
                if (response.data?.message !== "session time out") {
                    const user = response.data.user
                    setUser({ username: user.username, email: user.email })
                    setAuth(true)
                }
                else localStorage.setItem("jwt_token", "")
            }
        }
        catch (error) {
            const err = error?.response?.data || error;
            setAuth(false)
            return { status: "error", message: err?.message || "Error occur while fetching user details" }
        }
    }

    useEffect(() => {
        const func = async () => {
            await fetchUserDetails();
            setLoading(false)
        }
        func()
    }, [])

    const login = async (email, pwd) => {
        try {
            const response = await basicAxios.post("/login", {
                email,
                password: pwd
            })
            const jwt_token = response.data.jwt_token
            localStorage.setItem("jwt_token", jwt_token)
            const result = await fetchUserDetails();
            if (result?.status === "error") throw new Error(result.message)
            navigate("/profile", { replace: true })
        }
        catch (error) {
            const err = error?.response?.data || error;
            return { status: "error", message: err?.message || "Login failed" }
        }
    }

    const logout = async () => {
        try {
            await authAxios.get("/logout")
            localStorage.setItem("jwt_token", "")
            setAuth(false)
            setUser({})
            navigate("/login", { replace: true })
        }
        catch (error) {
            const err = error?.response?.data || error;
            return { status: "error", message: err?.message || "Failed logout" }
        }
    }

    const signup = async (email, username, password) => {
        try {
            await basicAxios.post("/register", {
                email,
                username,
                password
            })
            navigate("/login", { replace: true })
        }
        catch (error) {
            const err = error?.response?.data || error;
            return { status: "error", message: err?.message || "Sign up failed" }
        }
    }

    const value = { auth, user, login, logout, signup, loading }

    return (
        <AuthContext.Provider value={value}>
            {loading ? "Loading" : children}
        </AuthContext.Provider>)
}

export { useAuth, AuthProvider }