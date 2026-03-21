import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import WorkingLogin from './components/WorkingLogin';
import Register from './components/Register';
import Discover from './components/Discover';
import Matches from './components/Matches';
import Chat from './components/Chat';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import EmailVerification from './components/EmailVerification';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<WorkingLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat/:matchId" element={<Chat />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/" element={<Navigate to="/discover" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
