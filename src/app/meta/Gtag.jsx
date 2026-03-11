// components/Gtag.jsx
import { useEffect } from 'react';

const GA_ID = 'G-CLNDL5TF46'; // Replace with your Google Analytics ID

const Gtag = () => {
    useEffect(() => {
        // Load the gtag.js script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        script.async = true;
        document.head.appendChild(script);

        // Initialize the gtag function
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', GA_ID);

        // Cleanup the script if component unmounts
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return null; // No visual output
};

export default Gtag;
