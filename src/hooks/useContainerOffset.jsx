import { addResizeListener } from '@/src/utils/sharedResizeObserver';
import { useEffect, useState } from 'react';

// Custom hook to get the offsetLeft of a container element and update on window resize
const useContainerOffset = (selector) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const updateOffset = () => {
            const element = document.querySelector(selector);
            if (element) {
                setOffset(element.offsetLeft);
            }
        };

        // Initial update
        updateOffset();

        // Use shared resize observer
        return addResizeListener(updateOffset);
    }, [selector]);

    return offset;
};

export default useContainerOffset;

