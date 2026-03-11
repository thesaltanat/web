import { useState, useEffect } from 'react';

const useWindowSize = (initialOffset = 15) => {
	const [windowSize, setWindowSize] = useState(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const updateSize = () => setWindowSize(window.innerWidth + initialOffset);

			// Set initial size
			updateSize();

			// Add event listener for resizing
			window.addEventListener('resize', updateSize);

			// Cleanup event listener on component unmount
			return () => window.removeEventListener('resize', updateSize);
		}
	}, [initialOffset]);

	return windowSize;
};

export default useWindowSize;
