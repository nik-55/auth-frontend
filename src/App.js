import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Profile from './components/Profile';
import RequiredAuth from './components/RequiredAuth';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<RequiredAuth><Profile /></RequiredAuth>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
