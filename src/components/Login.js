import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState("")
    const { login: signin } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        const pwd = passwordRef.current.value
        const email = emailRef.current.value

        try {
            setError("")
            if (!validator.isEmail(email)) throw new Error("Enter Valid Email")
            if (!validator.isLength(pwd, { min: 6, max: 20 })) throw new Error("Password should not be too short or too long")
            const res = await signin(email, pwd)
            if (res?.status === "error") throw new Error(res.message)
        }
        catch (err) {
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