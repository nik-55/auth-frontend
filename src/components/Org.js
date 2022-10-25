import React from 'react'
import { Link } from 'react-router-dom'
import org_logo from "../images/org-logo.jpg"

const Org = () => {
    return (
        <div className='org-header'>
            <Link className='org-logo-div' to={"/"}><img className='org-logo' src={org_logo} alt='org-logo' /></Link>
            <h1 className='org-name'><Link to={"/"}>Nikhil-OAuth</Link></h1></div>
    )
}

export default Org