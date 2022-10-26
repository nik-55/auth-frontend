import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { authAxios } from '../api/customAxios'
import { authReducer } from '../reducers/authReducer'
import { authConstant } from "../constants/authConstant"

const AuthContext = createContext()
const useAuth = () => {
    return useContext(AuthContext)
}

const initialState = {
    user: null,
    auth: false,
    loading: true
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const fetchUserDetails = async () => {
        try {
            if (localStorage.getItem("jwt_token")) {
                const response = await authAxios.get("/profile")
                if (response.data?.message !== "session time out") {
                    const user = response.data.user
                    dispatch({ type: authConstant.USER, payload: { user: user } })
                    dispatch({ type: authConstant.AUTH, payload: { auth: true } })
                }
                else localStorage.setItem("jwt_token", "")
            }
        }
        catch {
            dispatch({ type: authConstant.AUTH, payload: { auth: false } })
        }
    }

    useEffect(() => {
        const func = async () => {
            await fetchUserDetails();
            dispatch({ type: authConstant.LOADING, payload: { loading: false } })
        }
        if (state.loading) func()
    }, [state.loading])

    const value = { ...state, dispatch }

    return (
        <AuthContext.Provider value={value}>
            {state.loading ? <span className='loading'>Loading</span> : children}
        </AuthContext.Provider>)
}

export { useAuth, AuthProvider }