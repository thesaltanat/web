import { addResizeListener } from '@/src/utils/sharedResizeObserver';
import { useEffect, useState } from 'react';

const useDeviceTypeTab = () => {
    const [isTab, setIsTab] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsTab(window.innerWidth <= 993);
        };

        handleResize(); // Call initially
        return addResizeListener(handleResize);
    }, []);

    return isTab;
};

export default useDeviceTypeTab;
