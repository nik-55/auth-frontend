import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import OrgName from './components/OrgName';
import { AuthProvider } from './contexts/AuthContext';
import BasicRoutes from './routes/BasicRoutes';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <OrgName />
          <BasicRoutes />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
