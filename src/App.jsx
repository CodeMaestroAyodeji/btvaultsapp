import React from 'react'; // Ensure React is imported if using JSX
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Custom CSS

import TorrentManager from './pages/TorrentManager';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import EmailVerification from './pages/auth/EmailVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Home from './components/Home';
import PlanPage from './pages/public/PlanPage';
import FileUpload from './pages/torrent/FileUpload';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/public/About';
import ContactUs from './pages/public/ContactUs';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfUse from './pages/public/TermsOfUse';

const ProtectedRoute = ({ isAdmin, children }) => {
  const token = localStorage.getItem("token");
  const userIsAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && !userIsAdmin) {
    return <Navigate to="/dashboard" />;
  }

  if (!isAdmin && userIsAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const App = () => {
  return (
    <Router>
      {/* Add a wrapper for layout */}
      <div className="app-container">
        <Header />
        {/* Main content area */}
        <main className="content">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAdmin={false}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/torrents" element={<TorrentManager />} />
            <Route path="/file-upload" element={<FileUpload />} />
            <Route path="/plan-list" element={<PlanPage />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
