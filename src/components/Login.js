import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const { login } = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        const pwd = passwordRef.current.value
        const email = emailRef.current.value

        try {
            setError("")
            if (!validator.isEmail(email)) throw new Error("Enter Valid Email")
            if (!validator.isLength(pwd, { min: 6, max: 20 })) throw new Error("Password should contain 6 to 20 characters")
            login(email, pwd)
        }
        catch (err) {
            setError(err?.message || "Error Occured")
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