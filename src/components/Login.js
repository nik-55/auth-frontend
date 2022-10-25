import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { basicAxios } from '../api/customAxios';
import { useAuth } from '../context/AuthContext';
import { authConstant } from '../constants/authConstant';

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState("")
    const { dispatch } = useAuth()

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const pwd = passwordRef.current.value
        const email = emailRef.current.value
        try {
            setError("")
            if (!validator.isEmail(email)) throw new Error("Enter Valid Email")
            if (!validator.isLength(pwd, { min: 6, max: 20 })) throw new Error("Password should not be too short or too long")
            const response = await basicAxios.post("/login", {
                email,
                password: pwd
            })
            const jwt_token = response.data.jwt_token
            localStorage.setItem("jwt_token", jwt_token)
            dispatch({ type: authConstant.AUTH, payload: { auth: true } })
            dispatch({ type: authConstant.LOADING, payload: { loading: true } })
            navigate("/profile", { replace: true })
        }
        catch (error) {
            const err = error?.response?.data || error;
            setError(err?.message || "Login failed")
        }
    }

    return (
        <><form onSubmit={handleLogin} noValidate={true}>
            <input className='block' ref={emailRef} type={"email"} autoComplete="off" placeholder='email' />
            <input className='block' ref={passwordRef} type={"password"} placeholder='password' />
            <button className='block' type='submit'>Login</button></form>
            Don't have an account? <Link to={"/signup"}>Signup </Link>
            <small className='error'>{error}</small>
        </>
    )
}

export default Login