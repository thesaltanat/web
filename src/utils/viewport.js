/**
 * Server-side utility to calculate initial viewport height values
 * This provides fallback values before the client-side hook takes over
 */

/**
 * Generates the initial style attribute for the HTML element
 * @param {Object} options - Configuration options
 * @param {number} options.fallbackVh - Fallback vh value in pixels (default: 4.07)
 * @returns {string} Style attribute string
 */
export const getInitialViewportStyle = ({ fallbackVh = 4.07 } = {}) => {
	const styleProperties = [
		`--vh: ${fallbackVh}px`,
		`--dvh: ${fallbackVh}px`,
		`--svh: ${fallbackVh}px`,
		`/* --lvh: 1vh; */`,
	];

	return styleProperties.join(';');
};

/**
 * Alternative function to get viewport style object
 * @param {Object} options - Configuration options
 * @returns {Object} Style object for React components
 */
export const getInitialViewportStyleObject = ({ fallbackVh = 4.07 } = {}) => {
	return {
		'--vh': `${fallbackVh}px`,
		'--dvh': `${fallbackVh}px`,
		'--svh': `${fallbackVh}px`,
		// Note: lvh is commented out as it's typically 1vh on most devices
	};
};

/**
 * Calculate viewport height based on user agent (for SSR)
 * This is a rough estimation since we don't have access to actual viewport on server
 * @param {string} userAgent - User agent string
 * @returns {number} Estimated viewport height percentage
 */
export const estimateViewportHeight = (userAgent = '') => {
	// Default fallback
	let estimatedVh = 4.07;

	// Mobile devices typically have smaller effective viewport due to browser UI
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent,
		)
	) {
		estimatedVh = 3.5; // Smaller due to mobile browser chrome
	}

	// Tablet adjustments
	if (/iPad|Android(?=.*Tablet)/i.test(userAgent)) {
		estimatedVh = 4.0;
	}

	// Desktop browsers
	if (
		!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent,
		)
	) {
		estimatedVh = 4.07; // More consistent on desktop
	}

	return estimatedVh;
};

const viewportUtils = {
	getInitialViewportStyle,
	getInitialViewportStyleObject,
	estimateViewportHeight,
};

export default viewportUtils;
