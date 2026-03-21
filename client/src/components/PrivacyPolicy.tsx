import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/login" style={{
          display: 'flex',
          alignItems: 'center',
          color: '#a855f7',
          textDecoration: 'none',
          marginBottom: '30px'
        }}>
          <ArrowLeft style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          Back to App
        </Link>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Shield style={{ width: '40px', height: '40px', color: '#a855f7', marginBottom: '15px' }} />
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
              Privacy Policy
            </h1>
            <p style={{ color: '#6b7280' }}>Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div style={{ color: '#374151', lineHeight: '1.6' }}>
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                1. Information We Collect
              </h2>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#4b5563' }}>
                  Personal Information
                </h3>
                <ul style={{ paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '8px' }}>Name and email address</li>
                  <li style={{ marginBottom: '8px' }}>Age, gender, and location</li>
                  <li style={{ marginBottom: '8px' }}>Profile photos and bio</li>
                  <li style={{ marginBottom: '8px' }}>Interests and preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#4b5563' }}>
                  Usage Data
                </h3>
                <ul style={{ paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '8px' }}>App usage patterns</li>
                  <li style={{ marginBottom: '8px' }}>Device information</li>
                  <li style={{ marginBottom: '8px' }}>IP address and location data</li>
                  <li style={{ marginBottom: '8px' }}>Chat messages and interactions</li>
                </ul>
              </div>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                2. How We Use Your Information
              </h2>
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Service Operation:</strong> To provide and maintain our dating service
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Matching:</strong> To suggest compatible matches based on preferences
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Communication:</strong> To enable real-time chat between users
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Safety:</strong> To monitor for inappropriate content and behavior
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Improvement:</strong> To analyze usage patterns and improve our service
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                3. Information Sharing
              </h2>
              <p style={{ marginBottom: '15px' }}>We do not sell your personal information. We may share information only in the following circumstances:</p>
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>With Other Users:</strong> Profile information that you make public
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Service Providers:</strong> Trusted third parties for app functionality
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Business Transfers:</strong> In connection with mergers or acquisitions
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                4. Data Security
              </h2>
              <p style={{ marginBottom: '15px' }}>We implement appropriate security measures to protect your information:</p>
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <Lock style={{ width: '16px', height: '16px', marginRight: '8px', color: '#a855f7', display: 'inline', verticalAlign: 'middle' }} />
                  Encrypted data transmission (SSL/TLS)
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Database style={{ width: '16px', height: '16px', marginRight: '8px', color: '#a855f7', display: 'inline', verticalAlign: 'middle' }} />
                  Secure database storage
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Eye style={{ width: '16px', height: '16px', marginRight: '8px', color: '#a855f7', display: 'inline', verticalAlign: 'middle' }} />
                  Regular security audits and updates
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                5. Your Rights
              </h2>
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Correction:</strong> Update inaccurate or incomplete information
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Deletion:</strong> Request deletion of your account and data
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Portability:</strong> Transfer your data to another service
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Objection:</strong> Restrict processing of your data
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                6. Data Retention
              </h2>
              <p>
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations. 
                When you delete your account, we will delete your personal information within 30 days, except as required by law.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                7. Children's Privacy
              </h2>
              <p>
                Our service is not intended for children under 18. We do not knowingly collect personal information 
                from children under 18. If we become aware that we have collected information from a child under 18, 
                we will take steps to delete such information immediately.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                8. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the 
                new policy on this page and updating the "Last updated" date at the top.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                9. Contact Us
              </h2>
              <p>If you have questions about this Privacy Policy, please contact us:</p>
              <div style={{ 
                marginTop: '15px',
                padding: '20px',
                background: '#f9fafb',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#374151', marginBottom: '10px' }}>
                  <strong>Email:</strong> privacy@datingapp.com
                </p>
                <p style={{ color: '#374151' }}>
                  <strong>Response Time:</strong> We will respond within 30 days
                </p>
              </div>
            </section>
          </div>

          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: '#f9fafb',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              This Privacy Policy is effective as of the date listed above and may be updated periodically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
