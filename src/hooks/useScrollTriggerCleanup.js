import { useEffect, useRef } from 'react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollTriggerCleanup = () => {
	const triggersRef = useRef([]);

	const addTrigger = trigger => {
		if (trigger) {
			triggersRef.current.push(trigger);
		}
		return trigger;
	};

	useEffect(() => {
		return () => {
			// Clean up all ScrollTrigger instances
			triggersRef.current.forEach(trigger => {
				if (trigger && trigger.kill) {
					trigger.kill();
				}
			});
			triggersRef.current = [];
		};
	}, []);

	return { addTrigger };
};
