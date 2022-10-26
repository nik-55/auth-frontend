import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';

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