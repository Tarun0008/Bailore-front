import { useState } from 'react';
import RaffleWidget from './RaffleWidget';

export default function RaffleWidgetWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Collapsed State: Coral icon button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            backgroundColor: '#E91E63',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          <span style={{ fontSize: '24px', color: 'white' }}>🎟️</span>
        </div>
      )}

      {/* Expanded State: Full widget panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            backgroundColor: 'var(--primary-bg, white)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ❌
          </button>
          <section className="section bg-ivory dark:bg-dark-background transition-colors duration-500 p-4">
            <RaffleWidget />
          </section>
        </div>
      )}
    </>
  );
}
