import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const RaffleWidget = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ticketCount, setTicketCount] = useState<number | null>(null);

    useEffect(() => {
        (window as any).axios = axios;
        
        const script = document.createElement('script');
        
        
        script.src = '/raffle-widget.js';
        
       
        
        script.async = true;
        
        script.onload = () => {
            try {
                if (window.raffleWidget && containerRef.current) {
                    window.raffleWidget.init('raffle-widget');
                    
                    if (window.raffleWidget.getTicketCount) {
                        const updateTicketCount = () => {
                            const count = window.raffleWidget.getTicketCount();
                            setTicketCount(count);
                        };
                        
                        updateTicketCount();
                        
                        const intervalId = setInterval(updateTicketCount, 5000);
                        
                        return () => clearInterval(intervalId);
                    }
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to initialize raffle widget');
                console.error('Raffle widget initialization error:', err);
            }
        };
        
        script.onerror = () => {
            setError('Failed to load raffle widget script. Please try again later.');
            setLoading(false);
        };
        
        document.head.appendChild(script);

        return () => {
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
            className="raffle-widget-wrapper"
            style={{
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
            }}
        >
            {error ? (
                <div style={{
                    color: '#dc3545',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                    {error}
                    <div style={{ marginTop: '10px' }}>
                        Please ensure the raffle widget script is available at {window.location.origin}/raffle-widget.js
                    </div>
                </div>
            ) : loading ? (
                <div style={{
                    color: '#666',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                    Loading raffle widget...
                </div>
            ) : (
                <>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '10px'
                    }}>
                        Current Raffle Status
                    </div>
                    {ticketCount !== null && (
                        <div style={{
                            fontSize: '24px',
                            color: '#28a745',
                            marginBottom: '15px'
                        }}>
                            Tickets Sold: {ticketCount.toLocaleString()}
                        </div>
                    )}
                    <div id="raffle-widget-container"></div>
                </>
            )}
        </div>
    );
};

declare global {
    interface Window {
        raffleWidget: {
            init: (containerId: string) => void;
            enterRaffle: () => void;
            getTicketCount: () => number;
            userId: string;
            tickets: number;
            isInitialized: boolean;
        };
        axios: any;
    }
}

export default RaffleWidget;
