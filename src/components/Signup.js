import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator';

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const cpasswordRef = useRef()
    const usernameRef = useRef()
    const [error, setError] = useState("")

    const handleSignup = (e) => {
        e.preventDefault();
        const pwd = passwordRef.current.value, cpwd = cpasswordRef.current.value
        const email = emailRef.current.value
        const username = usernameRef.current.value

        try {
            setError("")
            if (!validator.isEmail(email)) throw new Error("Enter Valid Email")
            if (!validator.isLength(username, { min: 6, max: 20 })) throw new Error("Username should contain 6 to 20 characters")
            if (!validator.isLength(pwd, { min: 6, max: 20 })) throw new Error("Password should contain 6 to 20 characters")
            if (pwd !== cpwd) throw new Error("Password and Confirm Password should be same")
        } catch (err) {
            setError(err?.message || "Error Occured")
        }
    }

    return (
        <>
            <form onSubmit={handleSignup} noValidate={true}>
                <input className='block' ref={emailRef} type={"email"} autoComplete="off" placeholder='email' />
                <input className='block' ref={usernameRef} type={"text"} autoComplete="off" placeholder='username' />
                <input className='block' ref={passwordRef} type={"password"} placeholder='password' />
                <input className='block' ref={cpasswordRef} type={"password"} placeholder='Confirm password' />
                <button className='block' type='submit'>Signup</button></form>
            Already have an account?<Link to={"/login"}>Login</Link>
            <small className='error'>{error}</small>
        </>
    )
}

export default Signup