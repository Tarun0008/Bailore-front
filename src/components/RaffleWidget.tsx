import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const RaffleWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerId = 'raffle-widget-container';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState<number | null>(null);

  useEffect(() => {
    (window as any).axios = axios;

    const script = document.createElement('script');
    script.src = '/raffle-widget.js';
    script.async = true;

    let intervalId: NodeJS.Timeout;

    script.onload = async () => {
      try {
        console.log('✅ raffle-widget.js loaded!');
        const containerExists = document.getElementById(innerContainerId);
        console.log('✅ Found container?', !!containerExists);

        if (window.raffleWidget && containerExists) {
          console.log('✅ Initializing raffleWidget...');
          await window.raffleWidget.init(innerContainerId);

          const updateTicketCount = () => {
            const count = window.raffleWidget.getTicketCount();
            setTicketCount(count);
          };

          updateTicketCount();
          intervalId = setInterval(updateTicketCount, 5000);

          setLoading(false);
        } else {
          console.error('❌ raffleWidget or container not found.');
          setError('Raffle widget not found.');
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to initialize raffle widget');
        setLoading(false);
      }
    };

    script.onerror = () => {
      setError('Failed to load raffle widget script.');
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      delete (window as any).axios;
    };
  }, []);

  return (
    <div
      id="raffle-widget"
      ref={containerRef}
      style={{
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        transition: 'all 0.5s ease',
        animation: 'fadeSlideUp 0.5s ease both'
      }}
    >
      {error && (
        <div style={{ color: '#dc3545', fontSize: '14px', textAlign: 'center' }}>{error}</div>
      )}
      {loading && !error && (
        <div style={{ color: '#666', fontSize: '14px', textAlign: 'center', marginBottom: '10px' }}>
          Loading raffle widget...
        </div>
      )}
      {!error && (
        <>
          <div   style={{
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontFamily: '"Playfair Display", serif',
  }}>
            Current Raffle Status
          </div>
          {ticketCount !== null && (
            <div style={{ fontSize: '24px', color: '#E91E63 ', marginBottom: '15px', fontFamily: '"Lora", serif' }}>
              Tickets: {ticketCount.toLocaleString()}
            </div>
          )}
          {/* ✅ Always mount this so raffleWidget.init always finds it */}
          <div id={innerContainerId}></div>
        </>
      )}
    </div>
  );
};

declare global {
  interface Window {
    raffleWidget: {
      init: (containerId: string) => Promise<void>;
      getTicketCount: () => number;
      proceedToPayment: () => Promise<void>;
      userId: string;
      tickets: number;
      isInitialized: boolean;
    };
    axios: any;
  }
}

export default RaffleWidget;
