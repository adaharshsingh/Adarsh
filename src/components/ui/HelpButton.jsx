import { useState } from 'react';

const HelpButton = ({ isPortfolioOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Only show button in gallery view (when portfolio is closed)
  if (isPortfolioOpen) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999,
          width: '56px',
          height: '56px',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          border: '1.5px solid rgba(59, 130, 246, 0.6)',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: '600',
          color: '#60A5FA',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.4)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.2)';
          e.currentTarget.style.border = '1.5px solid rgba(59, 130, 246, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)';
          e.currentTarget.style.border = '1.5px solid rgba(59, 130, 246, 0.6)';
        }}
      >
        ?
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999998,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#6b7280',
              }}
            >
              
            </button>

            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
              Navigation Guide
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <section>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}> Keyboard Shortcuts</h3>
                <ul style={{ marginLeft: '20px', gap: '8px' }}>
                  <li><kbd>1</kbd> - Desk View</li>
                  <li><kbd>2</kbd> - Gallery View</li>
                  <li><kbd>3</kbd> - MacBook View</li>
                  <li><kbd>4</kbd> - iPhone View</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}> Mouse Controls (Gallery View)</h3>
                <ul style={{ marginLeft: '20px', gap: '8px' }}>
                  <li><strong>Scroll:</strong> Zoom in/out</li>
                  <li><strong>Drag:</strong> Rotate around table</li>
                  <li><strong>Click Device:</strong> Open portfolio</li>
                </ul>
              </section>

              <section>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}> Special Effects</h3>
                <p style={{ margin: 0 }}>Watch for shooting stars with tails! At least 6 stars visible at all times, with 2-3 passing behind the MacBook screen.</p>
              </section>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '100%',
                marginTop: '24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;
