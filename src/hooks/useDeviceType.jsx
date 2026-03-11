import { addResizeListener } from '@/src/utils/sharedResizeObserver';
import { useEffect, useState } from 'react';

const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1170);
        };

        handleResize(); // Call initially
        return addResizeListener(handleResize);
    }, []);

    return isMobile;
};

export default useDeviceType;
