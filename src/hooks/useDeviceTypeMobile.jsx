import { addResizeListener } from '@/src/utils/sharedResizeObserver';
import { useEffect, useState } from 'react';

const useDeviceTypeMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize(); // Call initially
        return addResizeListener(handleResize);
    }, []);

    return isMobile;
};

export default useDeviceTypeMobile;
