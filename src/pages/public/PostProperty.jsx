import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './PostProperty.css';

export default function PostProperty() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="post-property-page" id="post-property-page">
      <div className="pp-container" style={{ alignItems: 'stretch' }}>
        <div className="pp-left">
          <h1 className="pp-heading">Add your property and store it directly in MongoDB.</h1>
          <ul className="pp-benefits">
            <li><span className="check-icon">?</span> Create real property records</li>
            <li><span className="check-icon">?</span> Manage them from your profile</li>
            <li><span className="check-icon">?</span> Save favourites and receive enquiries</li>
          </ul>
        </div>
        <div className="pp-right">
          <div className="pp-form-card">
            <h2 className="pp-form-title">Post a property</h2>
            <p className="pp-form-subtitle">You need an account and the demo OTP to continue.</p>
            <Link to={isAuthenticated ? '/post-property/form' : '/login'} className="pp-cta-btn" style={{ display: 'inline-flex', justifyContent: 'center', textDecoration: 'none' }}>
              {isAuthenticated ? 'Open property form' : 'Login to continue'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

