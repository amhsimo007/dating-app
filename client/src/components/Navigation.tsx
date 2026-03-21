import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Users, MessageCircle, LogOut, User, FileText, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          <Link to="/discover" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}>
            <Heart style={{ width: '32px', height: '32px', color: '#ec4899', marginRight: '8px' }} />
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>DatingApp</span>
          </Link>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <Link
              to="/discover"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ec4899'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              <Heart style={{ width: '20px', height: '20px', marginRight: '4px' }} />
              <span>Discover</span>
            </Link>
            
            <Link
              to="/matches"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ec4899'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              <Users style={{ width: '20px', height: '20px', marginRight: '4px' }} />
              <span>Matches</span>
            </Link>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <Link
                to="/terms"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec4899'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                <FileText style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ fontSize: '14px' }}>Terms</span>
              </Link>

              <Link
                to="/privacy"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec4899'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                <Shield style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                <span style={{ fontSize: '14px' }}>Privacy</span>
              </Link>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User style={{ width: '16px', height: '16px', color: 'white' }} />
                </div>
                <span style={{
                  marginLeft: '8px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {state.user?.profile.firstName}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  padding: '8px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                <LogOut style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
