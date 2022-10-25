import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Signup from '../components/Signup';

const BasicRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
    )
}

export default BasicRoutes