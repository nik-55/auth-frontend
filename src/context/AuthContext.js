import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAxios, caxios } from '../api/cAxios'
const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const login = async (email, pwd) => {
        try {
            const response = await caxios.post("/login", {
                email,
                password: pwd
            })
            const jwt_token = response.data.data.jwt_token
            localStorage.setItem("jwt_token", jwt_token)
            setAuth(true)
            navigate("/profile", { replace: true })
        }
        catch (err) {
            console.log(err?.message || "error occurred");
        }
    }

    useEffect(() => {
        const func = async () => {
            try {
                if (localStorage.getItem("jwt_token")) {
                    const response2 = await authAxios.get("/profile")
                    const user = response2.data.data
                    setAuth(true)
                    setUser({ username: user.username, email: user.email })
                }
            }
            catch (err) {
                setAuth(false)
                console.log(err?.message || "error occurred");
            }
            setLoading(false)
        }
        func()
    }, [auth])

    const logout = async () => {
        try {
            await authAxios.get("/logout")
            localStorage.setItem("jwt_token", "")
            setAuth(false)
        }
        catch (err) {
            console.log(err?.message || "error occurred");
        }
    }

    const signup = async (email, username, password) => {
        try {
            await caxios.post("/register", {
                email,
                username,
                password
            })

            navigate("/login", { replace: true })
        }
        catch (err) {
            console.log(err?.message || "error occurred");
        }
    }

    const value = { auth, user, login, logout, signup, loading }

    return <AuthContext.Provider value={value}>
        {loading ? "loading..." : children}
    </AuthContext.Provider>
}

export { useAuth, AuthProvider }