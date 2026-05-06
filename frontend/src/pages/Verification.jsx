import React from 'react';
import { ShieldCheck, TrendingUp, Globe } from 'lucide-react';

export default function Verification() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <section className="trust-section">
        <div className="container">
          <div className="section-header">
            <h2>Built on Trust</h2>
            <p>We go the extra mile to ensure every connection made on HireBlue is safe, secure, and professional.</p>
          </div>
          
          <div className="type-grid">
            <div className="feature-item card-clean">
              <div className="feature-icon">
                <ShieldCheck size={32} />
              </div>
              <h3>Identity Verified</h3>
              <p>Every worker undergoes a multi-step background check and identity verification process.</p>
            </div>
            <div className="feature-item card-clean">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Skill Badging</h3>
              <p>Workers can earn badges based on their work history, punctuality, and employer ratings.</p>
            </div>
            <div className="feature-item card-clean">
              <div className="feature-icon">
                <Globe size={32} />
              </div>
              <h3>Pan-India Network</h3>
              <p>Access a nationwide pool of talent or find jobs in your local neighborhood with ease.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
