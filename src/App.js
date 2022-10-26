import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Org from './components/Org';
import { AuthProvider } from './contexts/AuthContext';
import BasicRoutes from './routes/BasicRoutes';

function App() {
  return (
    <>
      <Router>
        <Org />
        <AuthProvider>
          <BasicRoutes />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
