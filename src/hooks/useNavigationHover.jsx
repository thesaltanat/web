import { useEffect } from 'react';

/**
 * useNavigationHover
 * Adds mouseenter/mouseleave listeners to an element (by ref, id or class)
 * and changes child SVG stroke colors on hover.
 *
 * Options:
 *  - ref: React ref to element (preferred)
 *  - id: element id selector
 *  - className: element class selector
 *  - hoverColor: stroke color to apply on hover
 *  - initialPathColor: optional color to restore on leave (if not provided,
 *      original computed stroke will be restored when available)
 */
const useNavigationHover = ({
	ref = null,
	id = null,
	className = null,
	hoverColor = '#FFFFFF',
	initialPathColor = null,
}) => {
	useEffect(() => {
		const getTargets = () => {
			if (ref && ref.current) return [ref.current];
			const selector = id ? `#${id}` : className ? `.${className}` : null;
			if (!selector) return [];
			return Array.from(document.querySelectorAll(selector));
		};

		const targets = getTargets();
		if (!targets.length) return undefined;

		// Map to store original stroke per element
		const originalStroke = new WeakMap();

		const setHover = el => {
			const svgs = el.querySelectorAll(
				'path, line, circle, rect, polyline, polygon',
			);
			svgs.forEach(node => {
				// store original stroke only once
				if (!originalStroke.has(node)) {
					const strokeAttr = node.getAttribute('stroke');
					const inline =
						node.style && node.style.stroke
							? node.style.stroke
							: null;
					originalStroke.set(node, strokeAttr ?? inline ?? null);
				}
				node.style.stroke = hoverColor;
			});
		};

		const unsetHover = el => {
			const svgs = el.querySelectorAll(
				'path, line, circle, rect, polyline, polygon',
			);
			svgs.forEach(node => {
				const orig = originalStroke.get(node);
				if (orig !== undefined && orig !== null) {
					node.style.stroke = orig;
				} else if (initialPathColor) {
					node.style.stroke = initialPathColor;
				} else {
					// remove inline stroke if nothing to restore
					node.style.removeProperty('stroke');
				}
			});
		};

		const handlers = [];
		targets.forEach(t => {
			const handleEnter = () => setHover(t);
			const handleLeave = () => unsetHover(t);
			t.addEventListener('mouseenter', handleEnter);
			t.addEventListener('mouseleave', handleLeave);
			handlers.push({ t, handleEnter, handleLeave });
		});

		return () => {
			handlers.forEach(({ t, handleEnter, handleLeave }) => {
				t.removeEventListener('mouseenter', handleEnter);
				t.removeEventListener('mouseleave', handleLeave);
			});
		};
	}, [ref, id, className, hoverColor, initialPathColor]);
};

export default useNavigationHover;
