import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='general-body bg'>
            <Link className='block' to={"/login"}>Login</Link>
            <Link className='block' to={"/profile"}>Profile</Link>
            <Link className='block' to={"/signup"}>Signup</Link>
        </div>
    )
}

export default Home