import React from 'react';
import { User, Languages, Phone, X, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const MobileSidePanel = ({ onClose }) => {
  return (
    <div
      className="mobile-side-panel-overlay"
      onClick={onClose}
    >
      <div
        className="mobile-side-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Logo and Close Button */}
        <div className="mobile-side-panel-header">
          <img src="/carlogo.png" alt="Logo" className="mobile-side-panel-logo" />
          <button 
            className="mobile-side-panel-close-btn"
            onClick={onClose}
            aria-label="Close panel"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Main Content */}
        <div className="mobile-side-panel-content">
          {/* Navigation Section */}
          <div className="mobile-side-panel-section">
            <h3 className="mobile-side-panel-section-title">
              NAVIGATION
            </h3>
            <div className="mobile-side-panel-nav-items">
              <button className="mobile-side-panel-nav-item">
                <User size={18} />
                <span>Login</span>
              </button>
              <button className="mobile-side-panel-nav-item">
                <Languages size={18} />
                <span>Language</span>
              </button>
              <button className="mobile-side-panel-nav-item">
                <Phone size={18} />
                <span>Contact</span>
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mobile-side-panel-section">
            <h3 className="mobile-side-panel-section-title">
              FOLLOW US
            </h3>
            <div className="mobile-side-panel-social-links">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-side-panel-social-link"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
                <span>Facebook</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-side-panel-social-link"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-side-panel-social-link"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-side-panel-social-link"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-side-panel-social-link"
                aria-label="Follow us on YouTube"
              >
                <Youtube size={20} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mobile-side-panel-footer">
          <p className="mobile-side-panel-footer-text">
            © 2024 Car Rental. All rights reserved.
          </p>
        </div>

        {/* Add required styles */}
        <style jsx>{`
          .mobile-side-panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom: 1px solid #f3f4f6;
            background: #f9fafb;
          }

          .mobile-side-panel-logo {
            height: 32px;
            width: auto;
          }

          .mobile-side-panel-close-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 8px;
            color: #6b7280;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-side-panel-close-btn:hover {
            background-color: #f3f4f6;
            color: #000000;
          }

          .mobile-side-panel-content {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
          }

          .mobile-side-panel-section {
            margin-bottom: 2rem;
          }

          .mobile-side-panel-section-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin: 0 0 1rem 0;
          }

          .mobile-side-panel-nav-items {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .mobile-side-panel-nav-item {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.875rem;
            background: none;
            border: none;
            cursor: pointer;
            border-radius: 8px;
            color: #374151;
            text-align: left;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s ease;
          }

          .mobile-side-panel-nav-item:hover {
            background-color: #f9fafb;
            color: #000000;
            transform: translateX(4px);
          }

          .mobile-side-panel-social-links {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .mobile-side-panel-social-link {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.875rem;
            text-decoration: none;
            border-radius: 8px;
            color: #374151;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s ease;
          }

          .mobile-side-panel-social-link:hover {
            background-color: #f9fafb;
            color: #2563eb;
            transform: translateX(4px);
          }

          .mobile-side-panel-footer {
            padding: 1rem;
            border-top: 1px solid #f3f4f6;
            background: #f9fafb;
          }

          .mobile-side-panel-footer-text {
            font-size: 0.75rem;
            color: #6b7280;
            text-align: center;
            margin: 0;
          }
        `}</style>
      </div>
    </div>
  );
};

export default MobileSidePanel;