import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Users, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
            <Heart style={{ width: '40px', height: '40px', color: '#ec4899', marginBottom: '15px' }} />
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
              Terms of Service
            </h1>
            <p style={{ color: '#6b7280' }}>Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div style={{ color: '#374151', lineHeight: '1.6' }}>
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By downloading and using the Dating App, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                2. User Requirements
              </h2>
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>You must be at least 18 years old to use this service</li>
                <li style={{ marginBottom: '10px' }}>You must provide accurate and truthful information</li>
                <li style={{ marginBottom: '10px' }}>You are responsible for maintaining the security of your account</li>
                <li style={{ marginBottom: '10px' }}>You must not share your account credentials with others</li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                3. Prohibited Conduct
              </h2>
              <p style={{ marginBottom: '15px' }}>You agree NOT to:</p>
              <ul style={{ paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>Harass, abuse, or harm other users</li>
                <li style={{ marginBottom: '10px' }}>Share inappropriate or offensive content</li>
                <li style={{ marginBottom: '10px' }}>Impersonate any person or entity</li>
                <li style={{ marginBottom: '10px' }}>Use the service for illegal activities</li>
                <li style={{ marginBottom: '10px' }}>Spam or send unsolicited messages</li>
              </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                4. Privacy and Data
              </h2>
              <p>
                We respect your privacy and handle your data in accordance with our Privacy Policy. 
                By using this service, you consent to the collection and use of information as outlined in our Privacy Policy.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                5. Account Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your account at any time for violations of these terms 
                or for any other reason we deem appropriate. You may also delete your account at any time.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                6. Disclaimers
              </h2>
              <p>
                The Dating App is provided "as is" without warranties of any kind. We are not responsible for 
                the conduct of users or the content they share. Use of this service is at your own risk.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
                7. Contact Information
              </h2>
              <p>If you have questions about these Terms of Service, please contact us at:</p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '20px',
                marginTop: '15px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Mail style={{ width: '16px', height: '16px', marginRight: '8px', color: '#a855f7' }} />
                  <span>support@datingapp.com</span>
                </div>
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
              By using Dating App, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
