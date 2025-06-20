import { useEffect, useRef } from 'react';
import axios from 'axios';

const RaffleWidget = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Make axios available globally for the raffle widget
        (window as any).axios = axios;
        
        // Load the raffle widget script
        const script = document.createElement('script');
        script.src = '/raffle-widget.js';
        script.async = true;
        script.onload = () => {
            // Initialize the widget once the script is loaded
            if (window.raffleWidget && containerRef.current) {
                window.raffleWidget.init('raffle-widget');
            }
        };
        
        document.head.appendChild(script);

        // Cleanup function
        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
            // Clean up global axios reference
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
                justifyContent: 'center'
            }}
        >
            <div style={{
                color: '#666',
                fontSize: '14px',
                textAlign: 'center'
            }}>
                Loading raffle widget...
            </div>
        </div>
    );
};

// Add TypeScript declaration for the global raffle widget
declare global {
    interface Window {
        raffleWidget: {
            init: (containerId: string) => void;
            enterRaffle: () => void;
            userId: string;
            tickets: number;
            isInitialized: boolean;
        };
        axios: any;
    }
}

export default RaffleWidget; 