import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <div className="main-wrapper">
        {!isAdminRoute ? <Navbar /> : null}
        <div className="main-content">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
