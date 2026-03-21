import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const EmailVerification: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    try {
      const response = await api.get('/email-verification/status');
      if (response.data.success) {
        setIsVerified(response.data.isVerified);
      }
    } catch (error) {
      console.error('Verification status error:', error);
    }
  };

  const sendVerificationEmail = async () => {
    setIsSending(true);
    setMessage('');
    
    try {
      const response = await api.post('/email-verification/send');
      if (response.data.success) {
        setMessage('Verification email sent! Please check your inbox.');
      } else {
        setMessage('Failed to send verification email. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending verification email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (!state.isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>Please log in to continue</h2>
          <Link to="/login" style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Mail style={{
            width: '48px',
            height: '48px',
            color: '#a855f7',
            marginBottom: '16px'
          }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            Email Verification
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Verify your email address to unlock all features
          </p>
        </div>

        {isVerified === true ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle style={{
              width: '64px',
              height: '64px',
              color: '#10b981',
              marginBottom: '16px'
            }} />
            <h2 style={{ color: '#10b981', marginBottom: '16px' }}>Email Verified!</h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Your email address has been successfully verified.
            </p>
            <Link to="/discover" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Continue to App
            </Link>
          </div>
        ) : isVerified === false ? (
          <div>
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#dc2626', marginBottom: '16px' }}>
                Please verify your email address to continue using all features.
              </p>
              <button
                onClick={sendVerificationEmail}
                disabled={isSending}
                style={{
                  width: '100%',
                  background: isSending ? '#9ca3af' : 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: isSending ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isSending ? 'Sending...' : 'Send Verification Email'}
              </button>
            </div>
            
            {message && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center',
                background: message.includes('sent') ? '#d1fae5' : '#fee2e2',
                color: message.includes('sent') ? '#065f46' : '#dc2626'
              }}>
                {message}
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #a855f7',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '16px'
            }}></div>
            <p style={{ color: '#6b7280' }}>Checking verification status...</p>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>
            Didn't receive the email?
          </p>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            fontSize: '14px',
            color: '#6b7280'
          }}>
            <li style={{ marginBottom: '4px' }}>• Check your spam folder</li>
            <li style={{ marginBottom: '4px' }}>• Make sure the email address is correct</li>
            <li style={{ marginBottom: '4px' }}>• Wait a few minutes for delivery</li>
          </ul>
          
          <Link 
            to="/login" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#a855f7',
              textDecoration: 'none',
              marginTop: '16px',
              fontSize: '14px'
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
