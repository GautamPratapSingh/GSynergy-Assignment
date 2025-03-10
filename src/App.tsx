import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/SignIn';
import Stores from './components/Stores';
import SKUs from './components/SKUs';
import Calendar from './components/Calendar';
import Planning from './components/Planning';
import Calculations from './components/Calculations';
import Chart from './components/Chart';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <TopNavBar />
        <div className="main-content">
          <SideNavBar />
          <div className="content">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/stores"
                element={
                  <ProtectedRoute>
                    <Stores />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skus"
                element={
                  <ProtectedRoute>
                    <SKUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/planning"
                element={
                  <ProtectedRoute>
                    <Planning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calculations"
                element={
                  <ProtectedRoute>
                    <Calculations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chart"
                element={
                  <ProtectedRoute>
                    <Chart />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<SignIn />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;