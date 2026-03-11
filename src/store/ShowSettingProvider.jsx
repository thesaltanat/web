'use client';

import {createContext, useContext, useEffect, useRef, useState} from 'react';
// Import React and necessary hooks
import {getGlobalApi} from '@/src/api';

// Import Lenis scroll handler initializer
import {initLenis} from '@/src/animations/getLenis';

// Create a store to share global settings and scroll control across the app
const ShowSettingContext = createContext();

// Custom hook to access ShowSettingContext
export const useShowSetting = () => useContext(ShowSettingContext);

// Provider component to wrap the app and supply global state and scroll control
export const ShowSettingProvider = ({
                                        children,
                                        // Optional pre-fetched data from server
                                        getSettings,
                                    }) => {
    // State for various global data sets
    const [settings, setSettings] = useState(getSettings ?? null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ref to hold Lenis instance for scroll control
    const lenisRef = useRef(null);

    // Initialize Lenis on mount and clean up on unmount
    useEffect(() => {
        lenisRef.current = initLenis();
        return () => {
            lenisRef.current = null;
        };
    }, []);

    // Fetch menus and settings once on mount
    useEffect(() => {
        // If pre-fetched data is provided, skip client fetching
        if (
            (settings)
        )
            return;
        let isMounted = true;
        const fetchGlobalData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [m1, m2, m3, s, featureProjects] = await Promise.all([
                    settings ? Promise.resolve(settings) : getGlobalApi(),

                ]);
                if (!isMounted) return;
                setSettings(s?.data || s || null);
            } catch (e) {
                if (!isMounted) return;
                setError(e);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchGlobalData();
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Methods to enable or disable smooth scrolling globally
    const disableScroll = () => {
        if (lenisRef.current) lenisRef.current.stop();
    };
    const enableScroll = () => {
        if (lenisRef.current) lenisRef.current.start();
    };

    // Provide global data, settings, and scroll control to children components
    return (
        <ShowSettingContext.Provider
            value={{
                // Backwards compatibility keys
                getSettings: getSettings || settings,
                settings,
                loading,
                error,
                lenis: lenisRef.current,
                disableScroll,
                enableScroll,
            }}>
            {children}
        </ShowSettingContext.Provider>
    );
};
