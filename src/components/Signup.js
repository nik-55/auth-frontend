import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { basicAxios } from '../api/customAxios';

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const cpasswordRef = useRef()
    const usernameRef = useRef()
    const btnRef = useRef()

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();
        btnRef.current.disabled = true
        const pwd = passwordRef.current.value, cpwd = cpasswordRef.current.value
        const email = emailRef.current.value
        const username = usernameRef.current.value
        try {
            setError("")
            if (!validator.isEmail(email)) throw new Error("Enter Valid Email")
            if (!validator.isLength(username, { min: 5, max: 18 })) throw new Error("Username should not be too short or too long")
            if (!validator.isLength(pwd, { min: 6, max: 20 })) throw new Error("Password should not be too short or too long")
            if (pwd !== cpwd) throw new Error("Password and Confirm Password should be same")
            await basicAxios.post("/register", {
                email,
                username,
                password: pwd
            })
            navigate("/login", { replace: true })
        } catch (error) {
            const err = error?.response?.data || error;
            setError(err?.message || "Registration failed")
        }
        btnRef.current.disabled = false
    }

    return (
        <div className='general-body bg'>
            <form onSubmit={handleSignup} noValidate={true} className='general-body'>
                <input className='block' ref={emailRef} type={"email"} autoComplete="off" placeholder='email' />
                <input className='block' ref={usernameRef} type={"text"} autoComplete="off" placeholder='username' />
                <input className='block' ref={passwordRef} type={"password"} placeholder='password' />
                <input className='block' ref={cpasswordRef} type={"password"} placeholder='Confirm password' />
                <button ref={btnRef} className='block' type='submit'>Signup</button></form>
            <small className='block'>Already have an account? <Link to={"/login"}>Login</Link></small>
            {error !== "" && <small className='error'>{error}</small>}
        </div>
    )
}

export default Signup