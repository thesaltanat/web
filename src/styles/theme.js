/**
 * ============================================================================
 * DC DESIGN SYSTEM - COMPREHENSIVE THEME CONFIGURATION
 * ============================================================================
 *
 * A systematic approach to design tokens and component styling.
 * This theme provides a complete design system with:
 * - Responsive grid system
 * - Typography scales
 * - Color palettes with opacity variants
 * - Animation and transition systems
 * - Layout utilities and positioning
 * - Component-specific styles
 *
 * @version 2.0.0
 * @author DC Design Team
 *
 * NAMING CONVENTIONS:
 * - camelCase for JavaScript properties
 * - Semantic naming over descriptive naming
 * - Consistent opacity scales (0-100)
 * - BEM-like structure for nested objects
 * ============================================================================
 */
import '@/src/app/global.css';

/* eslint-disable no-console */

// ============================================================================
// UTILITY FUNCTIONS (Defined first to avoid circular references)
// ============================================================================
const utils = {
	// Alpha color helper - safely creates rgba() from hex color
	alpha: (color, opacity = 1) => {
		if (typeof color !== 'string') {
			console.warn('alpha(): Invalid color type →', color);
			return color; // Return as-is instead of crashing
		}

		const hex = color.replace('#', '').trim();

		// Handle shorthand hex (#abc)
		const fullHex =
			hex.length === 3
				? hex
						.split('')
						.map(x => x + x)
						.join('')
				: hex;

		// Parse RGB
		const r = parseInt(fullHex.substr(0, 2), 16);
		const g = parseInt(fullHex.substr(2, 2), 16);
		const b = parseInt(fullHex.substr(4, 2), 16);

		if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
			console.warn('alpha(): Invalid hex value →', color);
			return color;
		}

		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	},

	// Responsive value helper
	responsive: values => {
		const { mobile, tablet, desktop, wide } = values;
		return {
			base: mobile,
			'@media (min-width: 768px)': { value: tablet },
			'@media (min-width: 1024px)': { value: desktop },
			'@media (min-width: 1440px)': { value: wide },
		};
	},

	// Clamp helper for fluid typography
	clamp: (min, preferred, max) => `clamp(${min}, ${preferred}, ${max})`,

	// CSS custom properties helper
	cssVars: (obj, prefix = '') => {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			if (typeof value === 'object' && value !== null) {
				return { ...acc, ...utils.cssVars(value, `${prefix}${key}-`) };
			}
			acc[`--${prefix}${key}`] = value;
			return acc;
		}, {});
	},

	// Get CSS custom property
	cssVar: name => `var(--${name})`,

	// Spacing helper for responsive properties
	spacingResponsive: (property, values) => {
		if (typeof values === 'string') {
			return { [property]: values };
		}
		return Object.entries(values).reduce((acc, [bp, val]) => {
			if (bp === 'base') {
				acc[property] = val;
			} else if (grid.media[bp]) {
				acc[grid.media[bp]] = { [property]: val };
			}
			return acc;
		}, {});
	},
};

// ============================================================================
// A) GRID SYSTEM & BREAKPOINTS
// ============================================================================
/**
 * Responsive grid system with semantic breakpoint names
 * Based on real device dimensions and usage patterns
 */
const grid = {
	// Container system - responsive max-widths
	container: {
		xs: '100%',
		sm: '100%',
		md: '100%',
		tab: '90%',
		lg: '80%',
		laptop: '80%',
		desktop: '80%',
		wide: '80%',
		xl: '80%',
		xxl: '80%',
		uhd: '80%',
		full: '100vw',
		fluid: '100%',
	},

	// Gutter system - spacing between columns
	gutter: {
		xs: '15px',
		sm: '15px',
		md: '15px',
		tab: '0px',
		lg: '0px',
		laptop: '0px',
		desktop: '0px',
		wide: '0px',
		xl: '0px',
		xxl: '0px',
		uhd: '0px',
	},

	// Breakpoints - device-oriented naming
	breakpoint: {
		xs: '329px', // Small phones (Galaxy Fold)
		sm: '576px', // Standard mobile
		md: '767px', // Large phones/small tablets
		tab: '768px', // Tablets portrait
		laptop: '992px', // Small laptops (13")
		notebook: '1024px', // Standard laptops
		desktop: '1336px', // Desktop monitors (15"-16")
		wide: '1440px', // Full HD desktop
		xl: '1536px', // Large monitors
		xxl: '1680px', // Ultra-wide HD
		uhd: '1920px', // Full 1080p/2K
	},

	// Grid columns
	columns: {
		1: 'repeat(1, minmax(0, 1fr))',
		2: 'repeat(2, minmax(0, 1fr))',
		3: 'repeat(3, minmax(0, 1fr))',
		4: 'repeat(4, minmax(0, 1fr))',
		5: 'repeat(5, minmax(0, 1fr))',
		6: 'repeat(6, minmax(0, 1fr))',
		7: 'repeat(7, minmax(0, 1fr))',
		8: 'repeat(8, minmax(0, 1fr))',
		9: 'repeat(9, minmax(0, 1fr))',
		10: 'repeat(10, minmax(0, 1fr))',
		11: 'repeat(11, minmax(0, 1fr))',
		12: 'repeat(12, minmax(0, 1fr))',
	},

	// Media queries
	media: {
		// Min-width queries
		up: {
			xs: '@media (min-width: 329px)',
			sm: '@media (min-width: 576px)',
			md: '@media (min-width: 767px)',
			tab: '@media (min-width: 768px)',
			laptop: '@media (min-width: 992px)',
			notebook: '@media (min-width: 1024px)',
			desktop: '@media (min-width: 1336px)',
			wide: '@media (min-width: 1440px)',
			xl: '@media (min-width: 1536px)',
			xxl: '@media (min-width: 1680px)',
			uhd: '@media (min-width: 1920px)',
		},
		// Max-width queries
		down: {
			sm: '@media (max-width: 575.98px)',
			md: '@media (max-width: 766.98px)',
			tab: '@media (max-width: 991.98px)',
			laptop: '@media (max-width: 1025px)',
			desktop: '@media (max-width: 1335.98px)',
			wide: '@media (max-width: 1439.98px)',
			xl: '@media (max-width: 1535.98px)',
			xxl: '@media (max-width: 1679.98px)',
			uhd: '@media (max-width: 1919.98px)',
		},
		// Orientation queries
		orientation: {
			portrait: '@media (orientation: portrait)',
			landscape: '@media (orientation: landscape)',
		},
		// Device-specific queries
		mobile: '@media (max-width: 767px)',
		tablet: '@media (max-width: 991px)',
		desktop: '@media (min-width: 992px)',
		retina: '@media (-webkit-min-device-pixel-ratio: 2)',
	},
};

// ============================================================================
// B) SPACING SYSTEM
// ============================================================================
/**
 * Consistent spacing scale based on 4px baseline
 * Provides both numeric and semantic scales
 */
const spacing = {
	// Base spacing scale (rem units)
	scale: {
		0: '0',
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		7: '1.75rem', // 28px
		8: '2rem', // 32px
		10: '2.5rem', // 40px
		12: '3rem', // 48px
		16: '4rem', // 64px
		20: '5rem', // 80px
		24: '6rem', // 96px
		32: '8rem', // 128px
	},

	// Semantic spacing for common use cases
	semantic: {
		xs: '0.25rem', // 4px
		sm: '0.5rem', // 8px
		md: '1rem', // 16px
		lg: '2rem', // 32px
		xl: '4rem', // 64px
		xxl: '6rem', // 96px
	},

	// Component-specific spacing
	component: {
		buttonPadding: '12px 24px',
		inputPadding: '12px 16px',
		cardPadding: '24px',
		sectionPadding: '80px 0',
		containerPadding: '0 20px',
	},
};

// ============================================================================
// C) TYPOGRAPHY SYSTEM
// ============================================================================
/**
 * Comprehensive typography system with responsive scales
 * Includes font families, weights, sizes, and complete text styles
 */
const typography = {
	// Font families
	fonts: {
		primary: "'Mosvita', Arial, Helvetica, sans-serif",
		secondary: "'Cammron', Arial, Helvetica, serif",
		accent: "'Cammron', serif",
		mono: "'Mosvita', 'Courier New', monospace",
		system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
		inherit: 'inherit',
	},

	// Font weights
	fontWeights: {
		hairline: 100,
		thin: 200,
		extraLight: 200,
		light: 300,
		book: 350,
		regular: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		heavy: 850,
		black: 900,
		ultra: 950,
	},

	// Font styles
	fontStyles: {
		normal: 'normal',
		italic: 'italic',
		oblique: 'oblique',
		inherit: 'inherit',
	},

	// Responsive font sizes
	fontSizes: {
		// Hero section
		heroDisplay: { desktop: '140px', tab: '96px', mobile: '64px' },
		heroSubheading: { desktop: '96px', tab: '72px', mobile: '48px' },

		// Headings
		h1: { desktop: '5.333rem', tab: '5.333rem', mobile: '5.333rem' },
		h2: { desktop: '4.444rem', tab: '3.444rem', mobile: '3rem' },
		h3: { desktop: '3.556rem', tab: '3.556rem', mobile: '3.556rem' },
		h4: { desktop: '3.111rem', tab: '3.111rem', mobile: '3.111rem' },
		h5: { desktop: '2.667rem', tab: '2.667rem', mobile: '2.667rem' },
		h6: { desktop: '2rem', tab: '2rem', mobile: '2rem' },

		// Body text
		bodyXL: { desktop: '2.667rem', tab: '2.667rem', mobile: '2.667rem' },
		bodyL: { desktop: '2rem', tab: '2rem', mobile: '2rem' },
		bodyM: { desktop: '1.111rem', tab: '1.111rem', mobile: '1.111rem' },
		bodyS: { desktop: '1rem', tab: '1rem', mobile: '1rem' },

		// UI text
		buttonL: { desktop: '1.25rem', tab: '1.125rem', mobile: '1rem' },
		buttonM: { desktop: '0.889rem', tab: '0.889rem', mobile: '0.889rem' },
		label: { desktop: '14px', tab: '13px', mobile: '12px' },
		caption: { desktop: '12px', tab: '12px', mobile: '11px' },
		overline: { desktop: '10px', tab: '10px', mobile: '9px' },
		custom: value => `${value}`, // Project-specific overrides
	},

	// Line heights
	lineHeights: {
		none: 1,
		tight: 1.25,
		base: 1.2,
		normal: 1.5,
		relaxed: 1.625,
		loose: 2,
	},

	// Letter spacing
	letterSpacing: {
		tighter: '-0.05em',
		tight: '-0.02em',
		normal: '0',
		wide: '0.025em',
		wider: '0.05em',
		widest: '0.1em',
	},

	// Fluid typography using clamp
	clamp: {
		xs: 'clamp(0.75rem, 1vw, 0.875rem)',
		sm: 'clamp(0.875rem, 1.2vw, 1rem)',
		base: 'clamp(1rem, 1.25vw, 1.125rem)',
		lg: 'clamp(1.125rem, 1.5vw, 1.25rem)',
		xl: 'clamp(1.25rem, 2vw, 1.5rem)',
		'2xl': 'clamp(1.5rem, 2.5vw, 2rem)',
		'3xl': 'clamp(2rem, 3vw, 2.5rem)',
		'4xl': 'clamp(2.5rem, 4vw, 3.5rem)',
		'5xl': 'clamp(3.5rem, 6vw, 6rem)',
		'6xl': 'clamp(6rem, 8vw, 8rem)',
		'7xl': 'clamp(8rem, 10vw, 11.111rem)',
		custom: value => `${value}`, // Project-specific overrides
	},

	// Text styles (predefined combinations)
	styles: {
		heroDisplay: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '10rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.04em',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '7rem',
				fontWeight: 400,
				lineHeight: 1.05,
				letterSpacing: '-0.03em',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '4rem',
				fontWeight: 400,
				lineHeight: 1.1,
				letterSpacing: '-0.02em',
			},
		},
		heroSubheading: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1.4,
				letterSpacing: '-0.01em',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '1.75rem',
				fontWeight: 400,
				lineHeight: 1.45,
				letterSpacing: '-0.01em',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '1.5rem',
				fontWeight: 400,
				lineHeight: 1.5,
				letterSpacing: '-0.01em',
			},
		},
		// =========================
		// Headings
		// =========================
		h1: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '5.333rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.107rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '4rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.107rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '3.33rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.107rem',
			},
		},
		h2: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '4.444rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.089rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '3rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.089rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.089rem',
			},
		},
		h3: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '3.556rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1,
				letterSpacing: '-0.071rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '3.556rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1,
				letterSpacing: '-0.071rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '3.556rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1,
				letterSpacing: '-0.071rem',
			},
		},
		h4: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '3.111rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.07rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '3.111rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '0.07rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '3.111rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.07rem',
			},
		},
		h5: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2.667rem',
				fontWeight: 400,
				lineHeight: 1.1,
				letterSpacing: '-0.053rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2.667rem',
				fontWeight: 400,
				lineHeight: 1.1,
				letterSpacing: '-0.053rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2.667rem',
				fontWeight: 400,
				lineHeight: 1.1,
				letterSpacing: '-0.053rem',
			},
		},
		h6: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1.1,
				letterSpacing: '-0.04rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1.1,
				letterSpacing: '-0.04rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1.1,
				letterSpacing: '-0.04rem',
			},
		},
		// =========================
		// Body & UI Text
		// =========================
		bodyXL: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '2.667rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1,
				letterSpacing: '-0.053rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '2.667rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1,
				letterSpacing: '-0.053rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontSize: '2.667rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1,
				letterSpacing: '-0.053rem',
			},
		},
		bodyL: {
			desktop: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.04rem',
			},
			tab: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.04rem',
			},
			mobile: {
				fontFamily: "'Cammron', Arial, Helvetica, serif",
				fontStyle: 'normal',
				fontSize: '2rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.04rem',
			},
		},
		bodyM: {
			desktop: {
				fontSize: '1.111rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.022rem',
			},
			tab: {
				fontSize: '1.111rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.022rem',
			},
			mobile: {
				fontSize: '1.111rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.022rem',
			},
		},
		bodyS: {
			desktop: {
				fontSize: '1rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1.2,
				letterSpacing: '-0.02rem',
			},
			tab: {
				fontSize: '1rem',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1.2,
				letterSpacing: '-0.02rem',
			},
			mobile: {
				fontSize: 'c',
				fontWeight: 400,
				fontStyle: 'normal',
				lineHeight: 1.2,
				letterSpacing: '-0.02rem',
			},
		},
		// =========================
		// Buttons & Labels
		// =========================
		buttonL: {
			desktop: {
				fontSize: '1.25rem',
				fontWeight: 600,
				lineHeight: 1.4,
				letterSpacing: '0.02em',
				textTransform: 'uppercase',
			},
			tab: {
				fontSize: '1.125rem',
				fontWeight: 600,
				lineHeight: 1.4,
				letterSpacing: '0.02em',
				textTransform: 'uppercase',
			},
			mobile: {
				fontSize: '1rem',
				fontWeight: 600,
				lineHeight: 1.4,
				letterSpacing: '0.02em',
				textTransform: 'uppercase',
			},
		},
		buttonM: {
			desktop: {
				fontFamily: "'Mosvita', Arial, Helvetica, sans-serif",
				fontStyle: 'normal',
				fontSize: '0.889rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.018rem',
			},
			tab: {
				fontFamily: "'Mosvita', Arial, Helvetica, sans-serif",
				fontStyle: 'normal',
				fontSize: '0.889rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.018rem',
			},
			mobile: {
				fontFamily: "'Mosvita', Arial, Helvetica, sans-serif",
				fontStyle: 'normal',
				fontSize: '0.889rem',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '-0.018rem',
			},
		},
		labelText: {
			desktop: {
				fontFamily: "'Faustina', Arial, Helvetica, serif",
				fontSize: '1rem',
				fontWeight: 500,
				lineHeight: 1.4,
				letterSpacing: '0.01em',
			},
			tab: {
				fontFamily: "'Faustina', Arial, Helvetica, serif",
				fontSize: '0.9375rem',
				fontWeight: 500,
				lineHeight: 1.4,
				letterSpacing: '0.01em',
			},
			mobile: {
				fontFamily: "'Faustina', Arial, Helvetica, serif",
				fontSize: '0.875rem',
				fontWeight: 500,
				lineHeight: 1.4,
				letterSpacing: '0.01em',
			},
		},
		caption: {
			desktop: {
				fontFamily: "'Faustina', Arial, Helvetica, serif",
				fontSize: '0.875rem',
				fontWeight: 400,
				lineHeight: 1.4,
				letterSpacing: '0',
			},
			tab: {
				fontFamily: "'Faustina', Arial, Helvetica, serif",
				fontSize: '0.8125rem',
				fontWeight: 400,
				lineHeight: 1.4,
				letterSpacing: '0',
			},
			mobile: {
				fontFamily: "'Faustina', Arial, Helvetica, serif",
				fontSize: '0.75rem',
				fontWeight: 400,
				lineHeight: 1.4,
				letterSpacing: '0',
			},
		},
		overline: {
			desktop: {
				fontFamily: "'Careny', Arial, Helvetica, sans-serif",
				fontSize: '0.75rem',
				fontWeight: 600,
				lineHeight: 1.4,
				letterSpacing: '0.08em',
				textTransform: 'uppercase',
			},
			tab: {
				fontFamily: "'Careny', Arial, Helvetica, sans-serif",
				fontSize: '0.6875rem',
				fontWeight: 600,
				lineHeight: 1.4,
				letterSpacing: '0.08em',
				textTransform: 'uppercase',
			},
			mobile: {
				fontFamily: "'Careny', Arial, Helvetica, sans-serif",
				fontSize: '0.625rem',
				fontWeight: 600,
				lineHeight: 1.4,
				letterSpacing: '0.08em',
				textTransform: 'uppercase',
			},
		},
	},
};

const backgrounds = {
	size: {
		auto: 'auto',
		cover: 'cover',
		contain: 'contain',
		full: '100% 100%',
		custom: value => `${value}`, // e.g. "50% 200px"
	},

	position: {
		center: 'center',
		top: 'top',
		bottom: 'bottom',
		left: 'left',
		right: 'right',
		topLeft: 'top left',
		topRight: 'top right',
		bottomLeft: 'bottom left',
		bottomRight: 'bottom right',
		custom: value => `${value}`, // e.g. "25% 75%"
	},

	repeat: {
		noRepeat: 'no-repeat',
		repeat: 'repeat',
		repeatX: 'repeat-x',
		repeatY: 'repeat-y',
		space: 'space',
		round: 'round',
	},

	attachment: {
		scroll: 'scroll',
		fixed: 'fixed',
		local: 'local',
	},

	origin: {
		paddingBox: 'padding-box',
		borderBox: 'border-box',
		contentBox: 'content-box',
	},

	clip: {
		borderBox: 'border-box',
		paddingBox: 'padding-box',
		contentBox: 'content-box',
		text: 'text',
	},

	blendMode: {
		normal: 'normal',
		multiply: 'multiply',
		screen: 'screen',
		overlay: 'overlay',
		darken: 'darken',
		lighten: 'lighten',
		colorDodge: 'color-dodge',
		colorBurn: 'color-burn',
		hardLight: 'hard-light',
		softLight: 'soft-light',
		difference: 'difference',
		exclusion: 'exclusion',
		hue: 'hue',
		saturation: 'saturation',
		color: 'color',
		luminosity: 'luminosity',
	},

	// Extended backgrounds for different scenarios
	patterns: {
		errorPage: {
			extended: {
				width: 'calc(100% + 120px)',
				height: 'calc(100% + 120px)',
			},
			extendedMobile: {
				width: 'calc(100% + 60px)',
				height: 'calc(100% + 60px)',
			},
		},
		hero: {
			extended: {
				width: 'calc(100% + 200px)',
				height: 'calc(100% + 200px)',
			},
			extendedMobile: {
				width: 'calc(100% + 100px)',
				height: 'calc(100% + 100px)',
			},
		},
	},
	// dynamic background value (color, image, gradient)
	custom: value => `${value}`,
};

// ============================================================================
// D) COLOR SYSTEM
// ============================================================================
/**
 * Comprehensive color system with semantic naming and opacity variants.
 * Colors are organized hierarchically: basic → brand → semantic → theme-specific
 * Each color includes opacity variants (0-100) and multiple format options.
 */
const colors = {
	// -------------------------
	// Basic Colors (Foundation)
	// -------------------------
	transparent: 'transparent',

	// White variants with opacity levels
	white: {
		0: 'rgba(255, 255, 255, 0)',
		10: 'rgba(255, 255, 255, 0.1)',
		20: 'rgba(255, 255, 255, 0.2)',
		30: 'rgba(255, 255, 255, 0.3)',
		40: 'rgba(255, 255, 255, 0.4)',
		50: 'rgba(255, 255, 255, 0.5)',
		60: 'rgba(255, 255, 255, 0.6)',
		70: 'rgba(255, 255, 255, 0.7)',
		75: 'rgba(255, 255, 255, 0.75)',
		80: 'rgba(255, 255, 255, 0.8)',
		90: 'rgba(255, 255, 255, 0.9)',
		100: 'rgba(255, 255, 255, 1)',
		base: '#FFFFFF',
		solid: 'rgb(255, 255, 255)',
	},

	// Black variants with opacity levels
	black: {
		0: 'rgba(0, 0, 0, 0)',
		10: 'rgba(0, 0, 0, 0.1)',
		20: 'rgba(0, 0, 0, 0.2)',
		30: 'rgba(0, 0, 0, 0.3)',
		40: 'rgba(0, 0, 0, 0.4)',
		50: 'rgba(0, 0, 0, 0.5)',
		60: 'rgba(0, 0, 0, 0.6)',
		70: 'rgba(0, 0, 0, 0.7)',
		75: 'rgba(0, 0, 0, 0.75)',
		80: 'rgba(0, 0, 0, 0.8)',
		90: 'rgba(0, 0, 0, 0.9)',
		100: 'rgba(0, 0, 0, 1)',
		base: '#000000',
		solid: 'rgb(0, 0, 0)',
	},

	// Gray scale (neutral colors)
	gray: {
		50: '#f7fafc',
		100: '#edf2f7',
		200: '#e2e8f0',
		300: '#cbd5e0',
		400: '#a0aec0',
		500: '#718096',
		600: '#4a5568',
		700: '#2d3748',
		800: '#1a202c',
		900: '#222222',
	},

	// -------------------------
	// Semantic Colors (UI States)
	// -------------------------
	semantic: {
		success: {
			0: 'rgba(72, 187, 120, 0)',
			10: 'rgba(72, 187, 120, 0.1)',
			20: 'rgba(72, 187, 120, 0.2)',
			30: 'rgba(72, 187, 120, 0.3)',
			40: 'rgba(72, 187, 120, 0.4)',
			50: 'rgba(72, 187, 120, 0.5)',
			60: 'rgba(72, 187, 120, 0.6)',
			70: 'rgba(72, 187, 120, 0.7)',
			75: 'rgba(72, 187, 120, 0.75)',
			80: 'rgba(72, 187, 120, 0.8)',
			90: 'rgba(72, 187, 120, 0.9)',
			100: 'rgba(72, 187, 120, 1)',
			base: '#48BB78',
			solid: 'rgb(72, 187, 120)',
		},
		warning: {
			0: 'rgba(237, 137, 54, 0)',
			10: 'rgba(237, 137, 54, 0.1)',
			20: 'rgba(237, 137, 54, 0.2)',
			30: 'rgba(237, 137, 54, 0.3)',
			40: 'rgba(237, 137, 54, 0.4)',
			50: 'rgba(237, 137, 54, 0.5)',
			60: 'rgba(237, 137, 54, 0.6)',
			70: 'rgba(237, 137, 54, 0.7)',
			75: 'rgba(237, 137, 54, 0.75)',
			80: 'rgba(237, 137, 54, 0.8)',
			90: 'rgba(237, 137, 54, 0.9)',
			100: 'rgba(237, 137, 54, 1)',
			base: '#ED8936',
			solid: 'rgb(237, 137, 54)',
		},
		error: {
			0: 'rgba(245, 101, 101, 0)',
			10: 'rgba(245, 101, 101, 0.1)',
			20: 'rgba(245, 101, 101, 0.2)',
			30: 'rgba(245, 101, 101, 0.3)',
			40: 'rgba(245, 101, 101, 0.4)',
			50: 'rgba(245, 101, 101, 0.5)',
			60: 'rgba(245, 101, 101, 0.6)',
			70: 'rgba(245, 101, 101, 0.7)',
			75: 'rgba(245, 101, 101, 0.75)',
			80: 'rgba(245, 101, 101, 0.8)',
			90: 'rgba(245, 101, 101, 0.9)',
			100: 'rgba(245, 101, 101, 1)',
			base: '#F56565',
			solid: 'rgb(245, 101, 101)',
		},
		info: {
			0: 'rgba(66, 153, 225, 0)',
			10: 'rgba(66, 153, 225, 0.1)',
			20: 'rgba(66, 153, 225, 0.2)',
			30: 'rgba(66, 153, 225, 0.3)',
			40: 'rgba(66, 153, 225, 0.4)',
			50: 'rgba(66, 153, 225, 0.5)',
			60: 'rgba(66, 153, 225, 0.6)',
			70: 'rgba(66, 153, 225, 0.7)',
			75: 'rgba(66, 153, 225, 0.75)',
			80: 'rgba(66, 153, 225, 0.8)',
			90: 'rgba(66, 153, 225, 0.9)',
			100: 'rgba(66, 153, 225, 1)',
			base: '#4299E1',
			solid: 'rgb(66, 153, 225)',
		},
	},

	// -------------------------
	// Theme-Specific Colors (Extended Palette)
	// -------------------------
	theme: {
		// Primary color scale with opacity variants
		primary: {
			0: 'rgba(238, 237, 227, 0)',
			10: 'rgba(238, 237, 227, 0.1)',
			20: 'rgba(238, 237, 227, 0.2)',
			30: 'rgba(238, 237, 227, 0.3)',
			40: 'rgba(238, 237, 227, 0.4)',
			50: 'rgba(238, 237, 227, 0.5)',
			60: 'rgba(238, 237, 227, 0.6)',
			70: 'rgba(238, 237, 227, 0.7)',
			75: 'rgba(238, 237, 227, 0.75)',
			80: 'rgba(238, 237, 227, 0.8)',
			90: 'rgba(238, 237, 227, 0.9)',
			100: 'rgba(238, 237, 227, 1)',
			base: '#EEECE3',
			solid: 'rgb(238, 237, 227)',
		},

		// Secondary color scale with opacity variants
		secondary: {
			10: 'rgba(29, 33, 23, 0.1)',
			20: 'rgba(29, 33, 23, 0.2)',
			30: 'rgba(29, 33, 23, 0.3)',
			40: 'rgba(29, 33, 23, 0.4)',
			50: 'rgba(29, 33, 23, 0.5)',
			60: 'rgba(29, 33, 23, 0.6)',
			70: 'rgba(29, 33, 23, 0.7)',
			80: 'rgba(29, 33, 23, 0.8)',
			90: 'rgba(29, 33, 23, 0.9)',
			100: 'rgba(29, 33, 23, 1)',
			base: '#1D2117',
			solid: 'rgb(29, 33, 23)',
		},

		// Color One
		colorOne: {
			10: 'rgba(35, 53, 30, 0.1)',
			20: 'rgba(35, 53, 30, 0.2)',
			30: 'rgba(35, 53, 30, 0.3)',
			40: 'rgba(35, 53, 30, 0.4)',
			50: 'rgba(35, 53, 30, 0.5)',
			60: 'rgba(35, 53, 30, 0.6)',
			70: 'rgba(35, 53, 30, 0.7)',
			80: 'rgba(35, 53, 30, 0.8)',
			90: 'rgba(35, 53, 30, 0.9)',
			100: 'rgba(35, 53, 30, 1)',
			base: '#23351E',
			solid: 'rgb(35, 53, 30)',
		},

		// Color Two
		colorTwo: {
			10: 'rgba(54, 50, 41, 0.1)',
			20: 'rgba(54, 50, 41, 0.2)',
			30: 'rgba(54, 50, 41, 0.3)',
			40: 'rgba(54, 50, 41, 0.4)',
			50: 'rgba(54, 50, 41, 0.5)',
			60: 'rgba(54, 50, 41, 0.6)',
			70: 'rgba(54, 50, 41, 0.7)',
			80: 'rgba(54, 50, 41, 0.8)',
			90: 'rgba(54, 50, 41, 0.9)',
			100: 'rgba(54, 50, 41, 1)',
			base: '#363229',
			solid: 'rgb(54, 50, 41)',
		},

		//color three
		colorThree: {
			10: 'rgba(186, 157, 81, 0.1)',
			20: 'rgba(186, 157, 81, 0.2)',
			30: 'rgba(186, 157, 81, 0.3)',
			40: 'rgba(186, 157, 81, 0.4)',
			50: 'rgba(186, 157, 81, 0.5)',
			60: 'rgba(186, 157, 81, 0.6)',
			70: 'rgba(186, 157, 81, 0.7)',
			80: 'rgba(186, 157, 81, 0.8)',
			90: 'rgba(186, 157, 81, 0.9)',
			100: 'rgba(186, 157, 81, 1)',
			base: '#BA9D51',
			solid: 'rgb(186, 157, 81)',
		},
	//color four
		colorFour: {
			10: 'rgba(39, 22, 9, 0.1)',
			20: 'rgba(39, 22, 9, 0.2)',
			30: 'rgba(39, 22, 9, 0.3)',
			40: 'rgba(39, 22, 9, 0.4)',
			50: 'rgba(39, 22, 9, 0.5)',
			60: 'rgba(39, 22, 9, 0.6)',
			70: 'rgba(39, 22, 9, 0.7)',
			80: 'rgba(39, 22, 9, 0.8)',
			90: 'rgba(39, 22, 9, 0.9)',
			100: 'rgba(39, 22, 9, 1)',
			base: '#271609',
			solid: 'rgb(39, 22, 9)',
		},

		//color five
		colorFive: {
			10: 'rgba(249, 249, 249, 0.1)',
			20: 'rgba(249, 249, 249, 0.2)',
			30: 'rgba(249, 249, 249, 0.3)',
			40: 'rgba(249, 249, 249, 0.4)',
			50: 'rgba(249, 249, 249, 0.5)',
			60: 'rgba(249, 249, 249, 0.6)',
			70: 'rgba(249, 249, 249, 0.7)',
			80: 'rgba(249, 249, 249, 0.8)',
			90: 'rgba(249, 249, 249, 0.9)',
			100: 'rgba(249, 249, 249, 1)',
			base: '#F9F9F9',
			solid: 'rgb(249, 249, 249)',
		},

		// Hover Color
		hoverColor: {
			10: 'rgba(186, 157, 81, 0.1)',
			20: 'rgba(186, 157, 81, 0.2)',
			30: 'rgba(186, 157, 81, 0.3)',
			40: 'rgba(186, 157, 81, 0.4)',
			50: 'rgba(186, 157, 81, 0.5)',
			60: 'rgba(186, 157, 81, 0.6)',
			70: 'rgba(186, 157, 81, 0.7)',
			80: 'rgba(186, 157, 81, 0.8)',
			90: 'rgba(186, 157, 81, 0.9)',
			100: 'rgba(186, 157, 81, 1)',
			base: '#BA9D51',
			solid: 'rgb(186, 157, 81)',
		},
		background: {
			10: 'rgba(250, 248, 242, 0.1)',
			20: 'rgba(250, 248, 242, 0.2)',
			30: 'rgba(250, 248, 242, 0.3)',
			40: 'rgba(250, 248, 242, 0.4)',
			50: 'rgba(250, 248, 242, 0.5)',
			60: 'rgba(250, 248, 242, 0.6)',
			70: 'rgba(250, 248, 242, 0.7)',
			80: 'rgba(250, 248, 242, 0.8)',
			90: 'rgba(250, 248, 242, 0.9)',
			100: 'rgba(250, 248, 242, 1)',
			base: '#FAF8F2',
			solid: 'rgb(250, 248, 242)',
		},
		footerBackground: {
			10: 'rgba(44, 41, 33, 0.1)',
			20: 'rgba(44, 41, 33, 0.2)',
			30: 'rgba(44, 41, 33, 0.3)',
			40: 'rgba(44, 41, 33, 0.4)',
			50: 'rgba(44, 41, 33, 0.5)',
			60: 'rgba(44, 41, 33, 0.6)',
			70: 'rgba(44, 41, 33, 0.7)',
			80: 'rgba(44, 41, 33, 0.8)',
			90: 'rgba(44, 41, 33, 0.9)',
			100: 'rgba(44, 41, 33, 1)',
			base: '#2c2921',
			solid: 'rgb(44, 41, 33)',
		},
	},

	// -------------------------
	// Gradient System
	// -------------------------
	gradients: {
		background:
			'linear-gradient(180.2deg, #FAF8F2 25.14%, #FAF8F2 102.55%)',

		// Dynamic gradient functions
		primary: (opacity1 = 0.45, opacity2 = 0) =>
			`linear-gradient(180deg, rgba(238, 237, 227, ${opacity1}) 0%, rgba(35, 53, 30, ${opacity2}) 100%)`,
		secondary: (opacity1 = 0.45, opacity2 = 0) =>
			`linear-gradient(180deg, rgba(29, 33, 23, ${opacity1}) 0%, rgba(35, 53, 30, ${opacity2}) 100%)`,
		overlay: (opacity = 0.8) =>
			`linear-gradient(180deg, rgba(0,0,0,0) 27.79%, rgba(0,0,0,${opacity}) 105.33%)`,
		radial: (opacity = 1) =>
			`radial-gradient(circle at center, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity}) 40%, transparent 70%)`,
	},

	// -------------------------
	// Overlay System
	// -------------------------
	overlays: {
		dark: {
			light: 'rgba(0, 0, 0, 0.2)',
			medium: 'rgba(0, 0, 0, 0.4)',
			heavy: 'rgba(0, 0, 0, 0.6)',
			darkest: 'rgba(0, 0, 0, 0.8)',
		},
		light: {
			light: 'rgba(250, 248, 242, 0.1)',
			medium: 'rgba(250, 248, 242, 0.2)',
			heavy: 'rgba(250, 248, 242, 0.4)',
			lightest: 'rgba(250, 248, 242, 0.6)',
		},
	},
};

// ============================================================================
// E) ANIMATION & TRANSITION SYSTEM
// ============================================================================
/**
 * Comprehensive animation system with durations, easing functions, and presets
 */
const animations = {
	// Duration values
	duration: {
		instant: '0s',
		fast: '0.2s',
		normal: '0.3s',
		medium: '0.5s',
		slow: '0.8s',
		slower: '1s',
		slowest: '1.5s',
	},

	// Easing functions
	easing: {
		linear: 'linear',
		ease: 'ease',
		easeIn: 'ease-in',
		easeOut: 'ease-out',
		easeInOut: 'ease-in-out',
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
		smooth: 'cubic-bezier(0.83, 0, 0.17, 1)',
		swift: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	},

	// Transition presets
	transition: {
		none: 'none',
		all: 'all',
		default: '0.6s all cubic-bezier(0.83, 0, 0.17, 1)',
		defaultEase: [0.76, 0, 0.24, 1],
		secondary: '0.6s all cubic-bezier(0.65, 0, 0.35, 1)',
		fast: '0.2s all cubic-bezier(0.83, 0, 0.17, 1)',
		slow: '1s all cubic-bezier(0.83, 0, 0.17, 1)',
		colors: '0.3s color, background-color, border-color',
		opacity: '0.3s opacity',
		transform: '0.3s transform',
	},

	// Keyframe animations
	keyframes: {
		fadeIn: `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `,
		fadeOut: `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `,
		fadeInUp: `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `,
		scaleIn: `
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `,
		spin: `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `,
	},

	// Animation presets
	presets: {
		fadeInUp: (duration = '0.8s', easing = 'ease-out') =>
			`fadeInUp ${duration} ${easing}`,
		fadeInDown: (duration = '0.6s', easing = 'ease-out') =>
			`fadeInDown ${duration} ${easing}`,
		scaleIn: (duration = '0.3s', easing = 'ease-out') =>
			`scaleIn ${duration} ${easing}`,
		spin: (duration = '1s', easing = 'linear', iteration = 'infinite') =>
			`spin ${duration} ${easing} ${iteration}`,
	},
};

// ============================================================================
// F) EFFECTS SYSTEM
// ============================================================================
/**
 * Visual effects including shadows, blur, and border radius
 */
const effects = {
	// Box shadow system
	shadows: {
		none: 'none',
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
		xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
	},

	// Opacity scale
	opacity: {
		0: 0,
		5: 0.05,
		10: 0.1,
		20: 0.2,
		25: 0.25,
		30: 0.3,
		40: 0.4,
		50: 0.5,
		60: 0.6,
		70: 0.7,
		75: 0.75,
		80: 0.8,
		90: 0.9,
		95: 0.95,
		100: 1,
		custom: value => `${value}`,
	},

	// Border radius system
	borderRadius: {
		none: '0',
		sm: '0.125rem', // 2px
		md: '0.375rem', // 6px
		lg: '0.5rem', // 8px
		xl: '0.75rem', // 12px
		xxl: '1rem', // 16px
		xxxl: '1.5rem', // 24px
		full: '9999px',
	},

	// Blur effects
	blur: {
		none: 'blur(0)',
		sm: 'blur(4px)',
		md: 'blur(8px)',
		lg: 'blur(16px)',
		xl: 'blur(24px)',
		xxl: 'blur(40px)',
	},
};

// ============================================================================
// G) POSITIONING SYSTEM
// ============================================================================
/**
 * Comprehensive positioning utilities and transform helpers
 */
const positioning = {
	// Position types
	type: {
		static: 'static',
		relative: 'relative',
		absolute: 'absolute',
		fixed: 'fixed',
		sticky: 'sticky',
	},

	// ============================================================================
	// ABSOLUTE POSITIONING PRESETS
	// ============================================================================
	absolute: {
		// Corner positions
		topLeft: {
			position: 'absolute',
			top: 0,
			left: 0,
		},
		topRight: {
			position: 'absolute',
			top: 0,
			right: 0,
		},
		bottomLeft: {
			position: 'absolute',
			bottom: 0,
			left: 0,
		},
		bottomRight: {
			position: 'absolute',
			bottom: 0,
			right: 0,
		},

		// Edge centers
		topCenter: {
			position: 'absolute',
			top: 0,
			left: '50%',
			transform: 'translateX(-50%)',
		},
		bottomCenter: {
			position: 'absolute',
			bottom: 0,
			left: '50%',
			transform: 'translateX(-50%)',
		},
		leftCenter: {
			position: 'absolute',
			left: 0,
			top: '50%',
			transform: 'translateY(-50%)',
		},
		rightCenter: {
			position: 'absolute',
			right: 0,
			top: '50%',
			transform: 'translateY(-50%)',
		},

		// Center positions
		center: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},
		centerX: {
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
		},
		centerY: {
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
		},

		// Full coverage
		fullCover: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		},
		fullInset: {
			position: 'absolute',
			inset: 0,
		},

		// Overlay patterns
		overlay: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},

		// Custom with offset helper
		custom: props => ({
			position: 'absolute',
			...props,
		}),
	},

	// ============================================================================
	// FIXED POSITIONING PRESETS
	// ============================================================================
	fixed: {
		// Corner positions
		topLeft: {
			position: 'fixed',
			top: 0,
			left: 0,
		},
		topRight: {
			position: 'fixed',
			top: 0,
			right: 0,
		},
		bottomLeft: {
			position: 'fixed',
			bottom: 0,
			left: 0,
		},
		bottomRight: {
			position: 'fixed',
			bottom: 0,
			right: 0,
		},

		// Edge centers
		topCenter: {
			position: 'fixed',
			top: 0,
			left: '50%',
			transform: 'translateX(-50%)',
		},
		bottomCenter: {
			position: 'fixed',
			bottom: 0,
			left: '50%',
			transform: 'translateX(-50%)',
		},
		leftCenter: {
			position: 'fixed',
			left: 0,
			top: '50%',
			transform: 'translateY(-50%)',
		},
		rightCenter: {
			position: 'fixed',
			right: 0,
			top: '50%',
			transform: 'translateY(-50%)',
		},

		// Center positions
		center: {
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},
		centerX: {
			position: 'fixed',
			left: '50%',
			transform: 'translateX(-50%)',
		},
		centerY: {
			position: 'fixed',
			top: '50%',
			transform: 'translateY(-50%)',
		},

		// Full screen
		fullScreen: {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
		},
		fullInset: {
			position: 'fixed',
			inset: 0,
		},

		// Common UI patterns
		header: {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			zIndex: 1000,
		},
		footer: {
			position: 'fixed',
			bottom: 0,
			left: 0,
			width: '100%',
			zIndex: 1000,
		},
		sidebar: {
			left: {
				position: 'fixed',
				top: 0,
				left: 0,
				height: '100vh',
				zIndex: 900,
			},
			right: {
				position: 'fixed',
				top: 0,
				right: 0,
				height: '100vh',
				zIndex: 900,
			},
		},
		// Modal backdrop
		backdrop: {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			zIndex: 1040,
		},

		// Custom with offset helper
		custom: props => ({
			position: 'fixed',
			...props,
		}),
	},

	// ============================================================================
	// STICKY POSITIONING PRESETS
	// ============================================================================
	sticky: {
		top: (offset = 0) => ({
			position: 'sticky',
			top: offset,
		}),
		bottom: (offset = 0) => ({
			position: 'sticky',
			bottom: offset,
		}),
		left: (offset = 0) => ({
			position: 'sticky',
			left: offset,
		}),
		right: (offset = 0) => ({
			position: 'sticky',
			right: offset,
		}),

		// Common patterns
		header: {
			position: 'sticky',
			top: 0,
			zIndex: 100,
		},
		sidebar: {
			position: 'sticky',
			top: '1rem',
			alignSelf: 'flex-start',
		},

		custom: props => ({
			position: 'sticky',
			...props,
		}),
	},

	// ============================================================================
	// RELATIVE POSITIONING UTILITIES
	// ============================================================================
	relative: {
		base: {
			position: 'relative',
		},
		withZIndex: (zIndex = 1) => ({
			position: 'relative',
			zIndex,
		}),
		custom: props => ({
			position: 'relative',
			...props,
		}),
	},

	// ============================================================================
	// INSET VALUES (for top, right, bottom, left)
	// ============================================================================
	inset: {
		0: 0,
		auto: 'auto',
		full: '100%',
		half: '50%',

		// Pixel values
		px: '1px',
		'2px': '2px',
		'4px': '4px',
		'8px': '8px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'40px': '40px',
		'50px': '50px',
		'60px': '60px',
		'80px': '80px',
		'100px': '100px',

		// Rem values
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		8: '2rem', // 32px
		10: '2.5rem', // 40px
		12: '3rem', // 48px
		16: '4rem', // 64px
		20: '5rem', // 80px

		// Negative values
		'-1': '-0.25rem',
		'-2': '-0.5rem',
		'-3': '-0.75rem',
		'-4': '-1rem',
		'-5': '-1.25rem',
		'-6': '-1.5rem',
		'-8': '-2rem',
		'-10': '-2.5rem',
		'-10px': '-10px',
		'-20px': '-20px',
		'-30px': '-30px',
		'-50px': '-50px',
		'-100px': '-100px',

		// Percentage values
		'1/4': '25%',
		'1/3': '33.333333%',
		'1/2': '50%',
		'2/3': '66.666667%',
		'3/4': '75%',

		custom: value => value,
	},

	// ============================================================================
	// TRANSFORM UTILITIES
	// ============================================================================
	transform: {
		// Translation
		center: 'translate(-50%, -50%)',
		centerX: 'translateX(-50%)',
		centerY: 'translateY(-50%)',
		translate: {
			x: value => `translateX(${value})`,
			y: value => `translateY(${value})`,
			xy: (x, y) => `translate(${x}, ${y})`,
			0: 'translate(0, 0)',
			full: 'translate(100%, 100%)',
			halfX: 'translateX(50%)',
			halfY: 'translateY(50%)',
			'-halfX': 'translateX(-50%)',
			'-halfY': 'translateY(-50%)',
		},

		// Rotation
		rotate: {
			0: 'rotate(0deg)',
			45: 'rotate(45deg)',
			90: 'rotate(90deg)',
			135: 'rotate(135deg)',
			180: 'rotate(180deg)',
			225: 'rotate(225deg)',
			270: 'rotate(270deg)',
			315: 'rotate(315deg)',
			'-45': 'rotate(-45deg)',
			'-90': 'rotate(-90deg)',
			'-180': 'rotate(-180deg)',
			custom: deg => `rotate(${deg}deg)`,
		},

		// Scale
		scale: {
			0: 'scale(0)',
			25: 'scale(0.25)',
			50: 'scale(0.5)',
			75: 'scale(0.75)',
			90: 'scale(0.9)',
			95: 'scale(0.95)',
			100: 'scale(1)',
			105: 'scale(1.05)',
			110: 'scale(1.1)',
			125: 'scale(1.25)',
			150: 'scale(1.5)',
			200: 'scale(2)',
			custom: value => `scale(${value})`,
			x: value => `scaleX(${value})`,
			y: value => `scaleY(${value})`,
		},

		// Flip
		flipX: 'scaleX(-1)',
		flipY: 'scaleY(-1)',
		flipBoth: 'scale(-1, -1)',

		// Skew
		skew: {
			x: deg => `skewX(${deg}deg)`,
			y: deg => `skewY(${deg}deg)`,
			xy: (x, y) => `skew(${x}deg, ${y}deg)`,
			3: 'skew(3deg)',
			6: 'skew(6deg)',
			12: 'skew(12deg)',
			'-3': 'skew(-3deg)',
			'-6': 'skew(-6deg)',
			'-12': 'skew(-12deg)',
		},

		// Transform origin
		origin: {
			center: 'center',
			top: 'top',
			topRight: 'top right',
			right: 'right',
			bottomRight: 'bottom right',
			bottom: 'bottom',
			bottomLeft: 'bottom left',
			left: 'left',
			topLeft: 'top left',
			custom: (x, y) => `${x} ${y}`,
		},

		// Combined transforms
		combined: {
			centerAndScale: (scale = 1) =>
				`translate(-50%, -50%) scale(${scale})`,
			centerAndRotate: (deg = 0) =>
				`translate(-50%, -50%) rotate(${deg}deg)`,
			scaleAndRotate: (scale = 1, deg = 0) =>
				`scale(${scale}) rotate(${deg}deg)`,
			custom: (...transforms) => transforms.join(' '),
		},

		// None
		none: 'none',
	},

	// ============================================================================
	// Z-INDEX SCALE
	// ============================================================================
	zIndex: {
		auto: 'auto',
		0: 0,
		1: 1,
		10: 10,
		20: 20,
		30: 30,
		40: 40,
		50: 50,

		// Semantic layers
		base: 0,
		dropdown: 1000,
		sticky: 1020,
		fixed: 1030,
		modalBackdrop: 1040,
		modal: 1050,
		popover: 1060,
		tooltip: 1070,
		notification: 1080,
		max: 2147483647, // Maximum safe integer for z-index

		// Negative values
		'-1': -1,
		'-10': -10,

		custom: value => value,
	},

	// ============================================================================
	// OVERFLOW UTILITIES
	// ============================================================================
	overflow: {
		auto: 'auto',
		hidden: 'hidden',
		visible: 'visible',
		scroll: 'scroll',
		clip: 'clip',

		x: {
			auto: { overflowX: 'auto' },
			hidden: { overflowX: 'hidden' },
			visible: { overflowX: 'visible' },
			scroll: { overflowX: 'scroll' },
			clip: { overflowX: 'clip' },
		},

		y: {
			auto: { overflowY: 'auto' },
			hidden: { overflowY: 'hidden' },
			visible: { overflowY: 'visible' },
			scroll: { overflowY: 'scroll' },
			clip: { overflowY: 'clip' },
		},
	},

	// ============================================================================
	// HELPER FUNCTIONS
	// ============================================================================
	helpers: {
		// Create custom absolute position
		absoluteAt: ({ top, right, bottom, left, transform, zIndex } = {}) => ({
			position: 'absolute',
			...(top !== undefined && { top }),
			...(right !== undefined && { right }),
			...(bottom !== undefined && { bottom }),
			...(left !== undefined && { left }),
			...(transform && { transform }),
			...(zIndex !== undefined && { zIndex }),
		}),

		// Create custom fixed position
		fixedAt: ({ top, right, bottom, left, transform, zIndex } = {}) => ({
			position: 'fixed',
			...(top !== undefined && { top }),
			...(right !== undefined && { right }),
			...(bottom !== undefined && { bottom }),
			...(left !== undefined && { left }),
			...(transform && { transform }),
			...(zIndex !== undefined && { zIndex }),
		}),

		// Create custom sticky position
		stickyAt: ({ top, right, bottom, left, zIndex } = {}) => ({
			position: 'sticky',
			...(top !== undefined && { top }),
			...(right !== undefined && { right }),
			...(bottom !== undefined && { bottom }),
			...(left !== undefined && { left }),
			...(zIndex !== undefined && { zIndex }),
		}),

		// Offset position with spacing
		offset: (position, spacing) => {
			const offsets = {};
			if (spacing.top !== undefined) offsets.top = spacing.top;
			if (spacing.right !== undefined) offsets.right = spacing.right;
			if (spacing.bottom !== undefined) offsets.bottom = spacing.bottom;
			if (spacing.left !== undefined) offsets.left = spacing.left;

			return {
				position,
				...offsets,
			};
		},

		// Full width/height coverage
		fullCoverage: (position = 'absolute') => ({
			position,
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		}),

		// Centered with custom offset
		centeredWithOffset: (
			position = 'absolute',
			offsetX = 0,
			offsetY = 0,
		) => ({
			position,
			top: '50%',
			left: '50%',
			transform: `translate(calc(-50% + ${offsetX}), calc(-50% + ${offsetY}))`,
		}),
	},
};

// ============================================================================
// H) COMPONENT SYSTEM
// ============================================================================
/**
 * Pre-built component styles and patterns
 */
const components = {
	//lenis scroll styles
	lenisScroll: {
		autoToggle: {
			transitionProperty: 'overflow',
			transitionDuration: animations.duration.slower,
			transitionBehavior: 'allow-discrete',
		},
	},

	body: {},

	// Button system
	button: {
		base: {
			fontFamily: typography.fonts.primary,
			fontSize: '1.125rem',
			fontWeight: '400',
			cursor: 'pointer',
			transition: animations.transition.default,
			textDecoration: 'none',
			letterSpacing: '-0.02em',
		},
		variants: {
			primary: {
				backgroundColor: colors.theme.primary.base,
				color: colors.white.base,
				'&:hover': {
					backgroundColor: colors.theme.woodland,
					transform: 'translateY(-2px)',
				},
			},
			secondary: {
				backgroundColor: 'transparent',
				color: colors.theme.primary.base,
				border: `2px solid ${colors.theme.primary.base}`,
				'&:hover': {
					backgroundColor: colors.theme.primary.base,
					color: colors.white.base,
				},
			},
		},
		sizes: {
			sm: {
				padding: '8px 16px',
				fontSize: typography.fontSizes.bodyS.desktop,
			},
			md: {
				padding: '12px 24px',
				fontSize: typography.fontSizes.bodyM.desktop,
			},
			lg: {
				padding: '16px 32px',
				fontSize: typography.fontSizes.bodyL.desktop,
			},
		},
	},

	// Card system
	card: {
		base: {
			backgroundColor: colors.white.base,
			borderRadius: effects.borderRadius.xl,
			boxShadow: effects.shadows.md,
			padding: spacing.component.cardPadding,
			border: `1px solid ${colors.gray[200]}`,
		},
		variants: {
			elevated: { boxShadow: effects.shadows.xl },
			outlined: {
				boxShadow: effects.shadows.none,
				border: `2px solid ${colors.gray[300]}`,
			},
			filled: { backgroundColor: colors.gray[50], border: 'none' },
		},
	},

	// Input system
	input: {
		base: {
			display: 'block',
			width: '100%',
			padding: spacing.component.inputPadding,
			fontSize: typography.fontSizes.bodyM.desktop,
			lineHeight: typography.lineHeights.normal,
			color: colors.gray[900],
			backgroundColor: colors.white.base,
			border: `1px solid ${colors.gray[300]}`,
			borderRadius: effects.borderRadius.md,
			transition: animations.transition.colors,
			'&:focus': {
				outline: 'none',
				borderColor: colors.theme.primary.base,
				boxShadow: `0 0 0 3px ${colors.theme.primary[10]}`,
			},
		},
	},

	// Header system Primary
	header: {
		base: {
			position: 'fixed',
			top: 0,
			left: 0,
			bottom: 'unset',
			height: '100%',
			width: '100%',
			zIndex: 99999,
			maxHeight: '115px',
			filter: 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))',
			transition: '0.6s all cubic-bezier(0.83, 0, 0.17, 1)',
			padding: '25px 0',
			background: 'transparent',
			willChange: 'transform, background-color',
		},

		closeIcon: {
			width: '35px',
			height: '35px',
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		closeIconLine: {
			content: '',
			position: 'absolute',
			width: '30px',
			height: '2px',
			backgrounds: colors.white.base,
			transition: '0.6s all cubic-bezier(0.83, 0, 0.17, 1)',
		},
	},

	preloader: {
		title: {
			fontSize: 'clamp(2.2rem, 8vw, 7rem)',
			color: colors.metallicBronze,
			fontWeight: typography.fontWeights.bold,
			lineHeight: typography.lineHeights.tight,
			overflow: 'hidden',
		},
		textContainer: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: 'clamp(2rem, 2vw, 2rem)',
			padding: `0 1rem`,
			maxWidth: '95vw',
		},
	},

	// 404 Page
	// Error page specific components
	errorPage: {
		container: {
			position: 'relative',
			overflow: 'hidden',
			minHeight: '100svh',
			...positioning.absolute.fullCover,
		},

		backgroundImage: {
			...positioning.absolute.topLeft,
			...backgrounds.patterns.errorPage.extended,
			transform: positioning.transform.rotate180,
			backgroundBlendMode: backgrounds.blendMode.darken,
			...backgrounds.size.cover,
			pointerEvents: 'none',
			opacity: effects.opacity[80],
		},

		backgroundImageMobile: {
			...backgrounds.patterns.errorPage.extendedMobile,
		},

		overlay: {
			...positioning.absolute.fullCover,
			content: "''",
		},

		contentContainer: {
			position: 'relative',
			maxWidth: grid.container.lg,
			margin: '0 auto',
		},

		animation: {
			entrance: animations.presets.fadeInUp(
				animations.duration.slow,
				animations.easing.easeOut,
			),
		},
	},
};

// ============================================================================
// I) LAYOUT UTILITIES
// ============================================================================
/**
 * Common layout patterns and display utilities
 */
const layout = {
	// Display properties
	display: {
		block: 'block',
		inline: 'inline',
		inlineBlock: 'inline-block',
		flex: 'flex',
		inlineFlex: 'inline-flex',
		grid: 'grid',
		inlineGrid: 'inline-grid',
		none: 'none',
		contents: 'contents',
	},

	// Flexbox utilities
	flex: {
		direction: {
			row: 'row',
			rowReverse: 'row-reverse',
			column: 'column',
			columnReverse: 'column-reverse',
		},
		wrap: {
			nowrap: 'nowrap',
			wrap: 'wrap',
			wrapReverse: 'wrap-reverse',
		},
		justify: {
			start: 'flex-start',
			center: 'center',
			end: 'flex-end',
			between: 'space-between',
			around: 'space-around',
			evenly: 'space-evenly',
		},
		align: {
			start: 'flex-start',
			center: 'center',
			end: 'flex-end',
			stretch: 'stretch',
			baseline: 'baseline',
		},
	},

	// Common layout patterns
	patterns: {
		flexCenter: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		flexBetween: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		flexColumn: {
			display: 'flex',
			flexDirection: 'column',
		},
		container: {
			width: '100%',
			maxWidth: grid.container.xl,
			margin: '0 auto',
			padding: `0 ${spacing.semantic.md}`,
		},
	},
};

// ============================================================================
// J) COMPREHENSIVE NUMERIC SCALE
// ============================================================================
/**
 * Extended numeric scale tokens for consistent styling primitives.
 * Helper builders minimize duplication across spacing/dimension maps.
 */
const spacingStepsRem = {
	0: '0',
	1: '0.25rem',
	2: '0.5rem',
	3: '0.75rem',
	4: '1rem',
	5: '1.25rem',
	6: '1.5rem',
	7: '1.75rem',
	8: '2rem',
	9: '2.5rem',
	10: '3rem',
	11: '4rem',
	12: '5rem',
};

const spacingPixelValues = {
	px: '1px',
	'10px': '10px',
	'15px': '15px',
	'20px': '20px',
	'25px': '25px',
	'30px': '30px',
	'35px': '35px',
	'40px': '40px',
	'45px': '45px',
	'50px': '50px',
};

const createSpacingScale = ({ allowAuto = false } = {}) => {
	const scaleTokens = {
		...spacingStepsRem,
		...spacingPixelValues,
	};
	if (allowAuto) {
		scaleTokens.auto = 'auto';
	}
	scaleTokens.unset = 'unset';
	scaleTokens.custom = value => `${value}`;
	return scaleTokens;
};

const dimensionPixelValues = {
	'1px': '1px',
	'10px': '10px',
	'15px': '15px',
	'20px': '20px',
	'25px': '25px',
	'30px': '30px',
	'35px': '35px',
	'40px': '40px',
	'45px': '45px',
	'50px': '50px',
	'60px': '60px',
	'70px': '70px',
	'80px': '80px',
	'90px': '90px',
	'100px': '100px',
	'120px': '120px',
	'150px': '150px',
	'200px': '200px',
	'250px': '250px',
	'300px': '300px',
};

const dimensionFractionValues = {
	'1/2': '50%',
	'1/3': '33.333333%',
	'2/3': '66.666667%',
	'1/4': '25%',
	'3/4': '75%',
	'1/5': '20%',
	'2/5': '40%',
	'3/5': '60%',
	'4/5': '80%',
};

const createDimensionScale = ({
	axis = 'width',
	includeScreen = false,
	includeFractions = true,
	allowAuto = true,
	allowNone = false,
} = {}) => {
	const scaleTokens = {
		0: '0',
		...dimensionPixelValues,
	};

	if (includeFractions) {
		Object.assign(scaleTokens, dimensionFractionValues);
	}

	if (allowAuto) {
		scaleTokens.auto = 'auto';
	}

	scaleTokens.full = '100%';
	if (includeScreen) {
		scaleTokens.screen = axis === 'height' ? '100vh' : '100vw';
	}
	scaleTokens.min = 'min-content';
	scaleTokens.max = 'max-content';
	scaleTokens.fit = 'fit-content';

	if (allowNone) {
		scaleTokens.none = 'none';
	}

	scaleTokens.unset = 'unset';
	scaleTokens.custom = value => `${value}`;
	return scaleTokens;
};

const maxWidthTokens = {
	0: '0',
	xs: '20rem',
	sm: '24rem',
	md: '28rem',
	lg: '32rem',
	xl: '36rem',
	'2xl': '42rem',
	'3xl': '48rem',
	'4xl': '56rem',
	'5xl': '64rem',
	'6xl': '72rem',
	'7xl': '80rem',
};

const sizeTokens = {
	0: '0',
	auto: 'auto',
	full: '100%',
	screen: '100vw',
	min: 'min-content',
	max: 'max-content',
	fit: 'fit-content',
	...dimensionFractionValues,
	custom: value => `${value}`,
};

const translateTokens = {
	0: '0',
	1: '0.25rem',
	2: '0.5rem',
	3: '0.75rem',
	4: '1rem',
	5: '1.5rem',
	6: '2rem',
	7: '3rem',
	8: '4rem',
	9: '6rem',
	10: '8rem',
	'5px': '5px',
	'10px': '10px',
	'15px': '15px',
	'20px': '20px',
	'25px': '25px',
	'30px': '30px',
	full: '100%',
	half: '50%',
	unset: 'unset',
	custom: value => `${value}`,
};

const insetTokens = {
	0: '0',
	auto: 'auto',
	full: '100%',
	half: '50%',
	'5px': '5px',
	'10px': '10px',
	'15px': '15px',
	'20px': '20px',
	'25px': '25px',
	'30px': '30px',
	'40px': '40px',
	'50px': '50px',
	// negative values
	'-10': '-10px',
	'-50': '-50px',
	'-100': '-100px',
	'-150': '-150px',
	'-200': '-200px',
	'-250': '-250px',
	unset: 'unset',
	custom: value => `${value}`,
};

const transformScaleTokens = {
	0: 0,
	50: 0.5,
	75: 0.75,
	90: 0.9,
	95: 0.95,
	100: 1,
	105: 1.05,
	110: 1.1,
	125: 1.25,
	150: 1.5,
	200: 2,
	unset: 'unset',
	custom: value => `${value}`,
};

const rotationTokens = {
	0: '0deg',
	1: '1deg',
	2: '2deg',
	3: '3deg',
	6: '6deg',
	12: '12deg',
	45: '45deg',
	90: '90deg',
	180: '180deg',
	unset: 'unset',
	custom: value => `${value}`,
};

const durationTokens = {
	0: '0s',
	1: '0.1s',
	2: '0.2s',
	3: '0.3s',
	4: '0.4s',
	5: '0.5s',
	6: '0.6s',
	7: '0.8s',
	8: '1s',
	9: '1.5s',
	10: '1.2s',
	75: '75ms',
	100: '100ms',
	150: '150ms',
	200: '200ms',
	300: '300ms',
	500: '500ms',
	700: '700ms',
	1000: '1000ms',
	preloaderMain: '60s',
	unset: 'unset',
	custom: value => `${value}`,
};

const delayTokens = {
	0: '0s',
	75: '75ms',
	100: '100ms',
	150: '150ms',
	200: '200ms',
	300: '300ms',
	500: '500ms',
	700: '700ms',
	1000: '1000ms',
	unset: 'unset',
	custom: value => `${value}`,
};

const staggerTokens = {
	0: 0,
	1: 0.1,
	2: 0.2,
	3: 0.3,
	4: 0.4,
	5: 0.5,
	6: 0.6,
	7: 0.8,
	8: 1,
	9: 1.5,
	10: 0.08,
};

const pixelStepTokens = {
	0: '0',
	1: '1px',
	2: '2px',
	4: '4px',
	8: '8px',
};

const outlineWidthTokens = {
	...pixelStepTokens,
	unset: 'unset',
	custom: value => `${value}`,
};

const ringWidthTokens = {
	...pixelStepTokens,
	default: '3px',
	unset: 'unset',
	custom: value => `${value}`,
};

const strokeWidthTokens = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	0.1: 0.1,
	0.2: 0.2,
	0.3: 0.3,
	0.4: 0.4,
	0.5: 0.5,
	0.6: 0.6,
	0.7: 0.7,
	0.8: 0.8,
	0.9: 0.9,
	10: 1,
	unset: 'unset',
	custom: value => `${value}`,
};

const aspectRatioTokens = {
	auto: 'auto',
	square: '1 / 1',
	video: '16 / 9',
	portrait: '3 / 4',
	landscape: '4 / 3',
	ultrawide: '21 / 9',
	unset: 'unset',
	custom: value => `${value}`,
};

const objectPositionTokens = {
	center: 'center',
	top: 'top',
	right: 'right',
	bottom: 'bottom',
	left: 'left',
	'top-left': 'top left',
	'top-right': 'top right',
	'bottom-left': 'bottom left',
	'bottom-right': 'bottom right',
	unset: 'unset',
	custom: value => `${value}`,
};

const columnCountTokens = {
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	auto: 'auto',
	unset: 'unset',
};

const textDecorationTokens = {
	none: 'none',
	underline: 'underline',
	overline: 'overline',
	lineThrough: 'line-through',
	underlineOverline: 'underline overline',
	dotted: 'underline dotted',
	dashed: 'underline dashed',
	double: 'underline double',
	wavy: 'underline wavy',
	custom: value => `${value}`,
};

const dropShadowTokens = {
	sm: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))',
	base: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1)) drop-shadow(0 1px 1px rgba(0,0,0,0.06))',
	md: 'drop-shadow(0 4px 3px rgba(0,0,0,0.07)) drop-shadow(0 2px 2px rgba(0,0,0,0.06))',
	lg: 'drop-shadow(0 10px 8px rgba(0,0,0,0.04)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
	xl: 'drop-shadow(0 20px 13px rgba(0,0,0,0.03)) drop-shadow(0 8px 5px rgba(0,0,0,0.08))',
	'2xl': 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
	none: 'none',
	unset: 'unset',
};

const textShadowTokens = {
	sm: '0 1px 2px rgba(0,0,0,0.1)',
	base: '0 2px 4px rgba(0,0,0,0.1)',
	md: '0 4px 6px rgba(0,0,0,0.1)',
	lg: '0 8px 16px rgba(0,0,0,0.1)',
	xl: '0 12px 24px rgba(0,0,0,0.15)',
	none: 'none',
	unset: 'unset',
};

const transitionPropertyTokens = {
	none: 'none',
	all: 'all',
	default:
		'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
	colors: 'background-color, border-color, color, fill, stroke',
	opacity: 'opacity',
	shadow: 'box-shadow',
	transform: 'transform',
	unset: 'unset',
};

const cursorTokens = {
	auto: 'auto',
	default: 'default',
	pointer: 'pointer',
	wait: 'wait',
	text: 'text',
	move: 'move',
	help: 'help',
	notAllowed: 'not-allowed',
	none: 'none',
	grab: 'grab',
	grabbing: 'grabbing',
	unset: 'unset',
};

const caretColorTokens = {
	auto: 'auto',
	transparent: 'transparent',
	current: 'currentColor',
	unset: 'unset',
};

const accentColorTokens = {
	auto: 'auto',
	current: 'currentColor',
	unset: 'unset',
};

const scrollSnapAlignTokens = {
	start: 'start',
	end: 'end',
	center: 'center',
	none: 'none',
	unset: 'unset',
};

const scrollSnapStopTokens = {
	normal: 'normal',
	always: 'always',
	unset: 'unset',
};

const scrollSnapTypeTokens = {
	none: 'none',
	x: 'x mandatory',
	y: 'y mandatory',
	both: 'both mandatory',
	xProximity: 'x proximity',
	yProximity: 'y proximity',
	bothProximity: 'both proximity',
	unset: 'unset',
};

const touchActionTokens = {
	auto: 'auto',
	none: 'none',
	panX: 'pan-x',
	panY: 'pan-y',
	pinchZoom: 'pinch-zoom',
	manipulation: 'manipulation',
	unset: 'unset',
};

const willChangeTokens = {
	auto: 'auto',
	scroll: 'scroll-position',
	contents: 'contents',
	transform: 'transform',
	opacity: 'opacity',
	unset: 'unset',
};

const contentTokens = {
	none: 'none',
	empty: '""',
	unset: 'unset',
	custom: value => `${value}`,
};

const fontSizeTokens = {
	xs: '0.75rem',
	sm: '0.875rem',
	base: '1rem',
	lg: '1.125rem',
	xl: '1.25rem',
	'2xl': '1.5rem',
	'3xl': '1.875rem',
	'4xl': '2.25rem',
	'5xl': '3rem',
	'6xl': '3.75rem',
	'7xl': '4.5rem',
	'8xl': '6rem',
	'9xl': '8rem',
	unset: 'unset',
	custom: value => `${value}`,
};

const clipPathTokens = {
	preloaderInitial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
	preloaderExit: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
	inset0: 'inset(0 0 0 0)',
	insetFull: 'inset(0%)',
	insetBottomHidden: 'inset(0 0 100% 0)',
	circle: 'circle(50%)',
	ellipse: 'ellipse(50% 50% at 50% 50%)',
	polygon: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
	custom: value => `${value}`,
};

const brightnessTokens = {
	0: 0,
	50: 0.5,
	75: 0.75,
	90: 0.9,
	95: 0.95,
	100: 1,
	105: 1.05,
	110: 1.1,
	125: 1.25,
	150: 1.5,
	200: 2,
	unset: 'unset',
	custom: value => value,
};

const contrastTokens = {
	0: 0,
	50: 0.5,
	75: 0.75,
	100: 1,
	125: 1.25,
	150: 1.5,
	200: 2,
	unset: 'unset',
	custom: value => value,
};

const grayscaleTokens = {
	0: 0,
	50: 0.5,
	100: 1,
	unset: 'unset',
	custom: value => value,
};

const hueRotateTokens = {
	0: '0deg',
	15: '15deg',
	30: '30deg',
	60: '60deg',
	90: '90deg',
	180: '180deg',
	unset: 'unset',
	custom: value => `${value}`,
};

const invertTokens = {
	0: 0,
	50: 0.5,
	100: 1,
	unset: 'unset',
	custom: value => value,
};

const saturateTokens = {
	0: 0,
	50: 0.5,
	100: 1,
	150: 1.5,
	200: 2,
	unset: 'unset',
	custom: value => value,
};

const sepiaTokens = {
	0: 0,
	50: 0.5,
	100: 1,
	unset: 'unset',
	custom: value => value,
};

const transitionsTokens = {
	none: 'none',
	all: 'all',
	default: 'cubic-bezier(0.83, 0, 0.17, 1)',
	main: '0.6s all cubic-bezier(0.83, 0, 0.17, 1)',
	mainTransition: '0.6s all cubic-bezier(0.83, 0, 0.17, 1)',
	secondary: '0.6s all cubic-bezier(0.65, 0, 0.35, 1)',
	emph: 'cubic-bezier(0.65, 0, 0.35, 1)',
	fast: '0.2s all cubic-bezier(0.83, 0, 0.17, 1)',
	slow: '1s all cubic-bezier(0.83, 0, 0.17, 1)',
	defaultEase: [0.76, 0, 0.24, 1],
	ease: 'ease',
	easeIn: 'ease-in',
	easeOut: 'ease-out',
	easeInOut: 'ease-in-out',
	linear: 'linear',
	property: transitionPropertyTokens,
	duration: durationTokens,
	delay: delayTokens,
};

const scale = {
	spacing: createSpacingScale({ allowAuto: true }),
	gap: createSpacingScale(),
	padding: createSpacingScale({ allowAuto: true }),
	margin: createSpacingScale({ allowAuto: true }),
	size: sizeTokens,
	width: createDimensionScale({ axis: 'width', includeScreen: true }),
	height: createDimensionScale({ axis: 'height', includeScreen: true }),
	minWidth: createDimensionScale({ axis: 'width', allowNone: true }),
	minHeight: createDimensionScale({
		axis: 'height',
		includeScreen: true,
		allowNone: true,
	}),
	maxWidth: {
		...maxWidthTokens,
		...dimensionPixelValues,
		...dimensionFractionValues,
		auto: 'auto',
		full: '100%',
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
		prose: '65ch',
		none: 'none',
		unset: 'unset',
		custom: value => `${value}`,
	},
	maxHeight: createDimensionScale({
		axis: 'height',
		includeScreen: true,
		allowNone: true,
	}),
	opacity: {
		...effects.opacity,
		unset: 'unset',
		custom: value => `${value}`,
	},
	zIndex: positioning.zIndex,
	translate: translateTokens,
	inset: insetTokens,
	scale: transformScaleTokens,
	rotate: rotationTokens,
	duration: durationTokens,
	delay: delayTokens,
	stagger: staggerTokens,
	blur: {
		...effects.blur,
		unset: 'unset',
	},
	borderWidth: {
		...pixelStepTokens,
		default: '1px',
		unset: 'unset',
		custom: value => `${value}`,
	},
	borderRadius: {
		...effects.borderRadius,
		unset: 'unset',
	},
	outlineWidth: outlineWidthTokens,
	outlineOffset: outlineWidthTokens,
	ringWidth: ringWidthTokens,
	ringOffset: outlineWidthTokens,
	strokeWidth: strokeWidthTokens,
	aspectRatio: aspectRatioTokens,
	objectPosition: objectPositionTokens,
	columns: columnCountTokens,
	columnGap: {
		...createSpacingScale(),
		normal: 'normal',
	},
	scrollMargin: createSpacingScale(),
	scrollPadding: createSpacingScale(),
	textIndent: createSpacingScale(),
	textDecoration: textDecorationTokens,
	backdropBlur: {
		0: '0',
		sm: 'blur(4px)',
		base: 'blur(8px)',
		md: 'blur(12px)',
		lg: 'blur(16px)',
		xl: 'blur(24px)',
		'2xl': 'blur(40px)',
		'3xl': 'blur(64px)',
		none: 'none',
		unset: 'unset',
	},
	brightness: brightnessTokens,
	contrast: contrastTokens,
	grayscale: grayscaleTokens,
	hueRotate: hueRotateTokens,
	invert: invertTokens,
	saturate: saturateTokens,
	sepia: sepiaTokens,
	dropShadow: dropShadowTokens,
	textShadow: textShadowTokens,
	transitionProperty: transitionPropertyTokens,
	cursor: cursorTokens,
	caretColor: caretColorTokens,
	accentColor: accentColorTokens,
	scrollSnapAlign: scrollSnapAlignTokens,
	scrollSnapStop: scrollSnapStopTokens,
	scrollSnapType: scrollSnapTypeTokens,
	touchAction: touchActionTokens,
	willChange: willChangeTokens,
	content: contentTokens,
	lineHeight: {
		0: 0,
		...typography.lineHeights,
		unset: 'unset',
		custom: value => `${value}`,
	},
	letterSpacing: {
		...typography.letterSpacing,
		unset: 'unset',
		custom: value => `${value}`,
	},
	fontWeight: {
		...typography.fontWeights,
		unset: 'unset',
	},
	fontStyles: {
		...typography.fontStyles,
		custom: value => `${value}`,
	},
	fontSize: fontSizeTokens,
	boxShadow: {
		...effects.shadows,
		unset: 'unset',
	},
	easing: {
		...animations.easing,
		unset: 'unset',
	},
	flex: {
		1: '1 1 0%',
		auto: '1 1 auto',
		initial: '0 1 auto',
		none: 'none',
		unset: 'unset',
	},
	order: {
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		first: -9999,
		last: 9999,
		none: 0,
		unset: 'unset',
	},
	gridCols: {
		1: 'repeat(1, minmax(0, 1fr))',
		2: 'repeat(2, minmax(0, 1fr))',
		3: 'repeat(3, minmax(0, 1fr))',
		4: 'repeat(4, minmax(0, 1fr))',
		5: 'repeat(5, minmax(0, 1fr))',
		6: 'repeat(6, minmax(0, 1fr))',
		12: 'repeat(12, minmax(0, 1fr))',
		none: 'none',
		unset: 'unset',
	},
	gridRows: {
		1: 'repeat(1, minmax(0, 1fr))',
		2: 'repeat(2, minmax(0, 1fr))',
		3: 'repeat(3, minmax(0, 1fr))',
		4: 'repeat(4, minmax(0, 1fr))',
		5: 'repeat(5, minmax(0, 1fr))',
		6: 'repeat(6, minmax(0, 1fr))',
		none: 'none',
		unset: 'unset',
	},
	objectFit: {
		contain: 'contain',
		cover: 'cover',
		fill: 'fill',
		none: 'none',
		scaleDown: 'scale-down',
	},
	clipPath: clipPathTokens,
	transitions: transitionsTokens,
	stroke: {
		dashArrayFull: 1000,
		dashOffsetFull: 1000,
		dashArrayHalf: 500,
		dashOffsetHalf: 500,
		dashArrayNone: 0,
		dashOffsetNone: 0,
		customDashArray: value => `${value}`,
		customDashOffset: value => `${value}`,
	},
};

const numericScale = {
	// Core numeric values (0-10)
	values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

	// Spacing scale (margin, padding, gap)
	spacing: {
		0: '0',
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		7: '1.75rem', // 28px
		8: '2rem', // 32px
		9: '2.5rem', // 40px
		10: '3rem', // 48px
		11: '4rem', // 64px
		12: '5rem', // 80px
		// Pixel values
		px: '1px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'45px': '45px',
		'50px': '50px',
		auto: 'auto',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Gap scale (for flexbox/grid)
	gap: {
		0: '0',
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		7: '1.75rem', // 28px
		8: '2rem', // 32px
		9: '2.5rem', // 40px
		10: '3rem', // 48px
		// Pixel values
		px: '1px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	textDecoration: {
		none: 'none',
		underline: 'underline',
		overline: 'overline',
		lineThrough: 'line-through',
		underlineOverline: 'underline overline',
		dotted: 'underline dotted',
		dashed: 'underline dashed',
		double: 'underline double',
		wavy: 'underline wavy',
		custom: value => `${value}`, // for any custom or combined value
	},

	padding: {
		0: '0',
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		7: '1.75rem', // 28px
		8: '2rem', // 32px
		9: '2.5rem', // 40px
		10: '3rem', // 48px
		// Pixel values
		px: '1px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	margin: {
		0: '0',
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		7: '1.75rem', // 28px
		8: '2rem', // 32px
		9: '2.5rem', // 40px
		10: '3rem', // 48px
		// Pixel values
		px: '1px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Width scale
	width: {
		0: '0',
		auto: 'auto',
		full: '100%',
		screen: '100vw',
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
		// Pixel values
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		'60px': '60px',
		'70px': '70px',
		'80px': '80px',
		'90px': '90px',
		'100px': '100px',
		'120px': '120px',
		'150px': '150px',
		'200px': '200px',
		'250px': '250px',
		'300px': '300px',
		unset: 'unset',
		// Fractional widths
		'1/2': '50%',
		'1/3': '33.333333%',
		'2/3': '66.666667%',
		'1/4': '25%',
		'3/4': '75%',
		'1/5': '20%',
		'2/5': '40%',
		'3/5': '60%',
		'4/5': '80%',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Height scale
	height: {
		0: '0',
		auto: 'auto',
		full: '100%',
		screen: '100vh',
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
		// Pixel values
		'1px': '1px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		'60px': '60px',
		'70px': '70px',
		'80px': '80px',
		'90px': '90px',
		'100px': '100px',
		'120px': '120px',
		'150px': '150px',
		'200px': '200px',
		'250px': '250px',
		'300px': '300px',
		unset: 'unset',
		// Fractional heights
		'1/2': '50%',
		'1/3': '33.333333%',
		'2/3': '66.666667%',
		'1/4': '25%',
		'3/4': '75%',
		'1/5': '20%',
		'2/5': '40%',
		'3/5': '60%',
		'4/5': '80%',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Min width scale
	minWidth: {
		0: '0',
		full: '100%',
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
		unset: 'unset',
		none: 'none',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Min height scale
	minHeight: {
		0: '0',
		full: '100%',
		screen: '100vh',
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
		unset: 'unset',
		none: 'none',
		// Pixel values
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		'60px': '60px',
		'70px': '70px',
		'80px': '80px',
		'90px': '90px',
		'100px': '100px',
		'120px': '120px',
		'150px': '150px',
		'200px': '200px',
		'250px': '250px',
		'300px': '300px',
		// Fractional heights
		'1/2': '50%',
		'1/3': '33.333333%',
		'2/3': '66.666667%',
		'1/4': '25%',
		'3/4': '75%',
		'1/5': '20%',
		'2/5': '40%',
		'3/5': '60%',
		'4/5': '80%',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Max width scale
	maxWidth: {
		0: '0',
		xs: '20rem', // 320px
		sm: '24rem', // 384px
		md: '28rem', // 448px
		lg: '32rem', // 512px
		xl: '36rem', // 576px
		'2xl': '42rem', // 672px
		'3xl': '48rem', // 768px
		'4xl': '56rem', // 896px
		'5xl': '64rem', // 1024px
		'6xl': '72rem', // 1152px
		'7xl': '80rem', // 1280px
		full: '100%',
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
		prose: '65ch',
		unset: 'unset',
		none: 'none',
		// Pixel values
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		'60px': '60px',
		'70px': '70px',
		'80px': '80px',
		'90px': '90px',
		'100px': '100px',
		'120px': '120px',
		'150px': '150px',
		'200px': '200px',
		'250px': '250px',
		'300px': '300px',
		// Fractional heights
		'1/2': '50%',
		'1/3': '33.333333%',
		'2/3': '66.666667%',
		'1/4': '25%',
		'3/4': '75%',
		'1/5': '20%',
		'2/5': '40%',
		'3/5': '60%',
		'4/5': '80%',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Max height scale
	maxHeight: {
		0: '0',
		full: '100%',
		screen: '100vh',
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
		unset: 'unset',
		none: 'none',
		// Pixel values
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'35px': '35px',
		'40px': '40px',
		'45px': '45px',
		'50px': '50px',
		'60px': '60px',
		'70px': '70px',
		'80px': '80px',
		'90px': '90px',
		'100px': '100px',
		'120px': '120px',
		'150px': '150px',
		'200px': '200px',
		'250px': '250px',
		'300px': '300px',
		// Fractional heights
		'1/2': '50%',
		'1/3': '33.333333%',
		'2/3': '66.666667%',
		'1/4': '25%',
		'3/4': '75%',
		'1/5': '20%',
		'2/5': '40%',
		'3/5': '60%',
		'4/5': '80%',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Opacity scale (0-1 range)
	opacity: {
		0: 0,
		5: 0.05,
		10: 0.1,
		20: 0.2,
		25: 0.25,
		30: 0.3,
		40: 0.4,
		50: 0.5,
		60: 0.6,
		70: 0.7,
		75: 0.75,
		80: 0.8,
		90: 0.9,
		95: 0.95,
		100: 1,
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Z-index scale
	zIndex: {
		0: 0,
		10: 10,
		20: 20,
		30: 30,
		40: 40,
		50: 50,
		60: 60,
		70: 70,
		80: 80,
		90: 90,
		99: 99,
		999: 999,
		9999: 9999,
		dropdown: 1000,
		sticky: 1020,
		fixed: 1030,
		modal: 1050,
		tooltip: 1070,
		full: 9999999999999999,
		auto: 'auto',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Transform/translation scale
	translate: {
		0: '0',
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.5rem', // 24px
		6: '2rem', // 32px
		7: '3rem', // 48px
		8: '4rem', // 64px
		9: '6rem', // 96px
		10: '8rem', // 128px
		// Pixel values
		'5px': '5px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		full: '100%',
		half: '50%',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Inset/Position scale (top, right, bottom, left)
	inset: {
		0: '0',
		auto: 'auto',
		full: '100%',
		half: '50%',
		// Pixel values
		'5px': '5px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		'40px': '40px',
		'50px': '50px',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Scale transform values
	scale: {
		0: 0,
		50: 0.5,
		75: 0.75,
		90: 0.9,
		95: 0.95,
		100: 1,
		105: 1.05,
		110: 1.1,
		125: 1.25,
		150: 1.5,
		200: 2,
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Rotation degrees
	rotate: {
		0: '0deg',
		1: '1deg',
		2: '2deg',
		3: '3deg',
		6: '6deg',
		12: '12deg',
		45: '45deg',
		90: '90deg',
		180: '180deg',
		unset: 'unset',
		custom: value => `${value}`, // e.g., 'clamp(-5rem, -10vw, -8rem)'
	},

	// Animation duration (seconds)
	duration: {
		0: '0s',
		1: 0.1,
		2: 0.2,
		3: 0.3,
		4: 0.4,
		5: 0.5,
		6: 0.6,
		7: 0.8,
		8: 1,
		9: 1.5,
		10: 1.2,
		75: '75ms',
		100: '100ms',
		150: '150ms',
		200: '200ms',
		300: '300ms',
		500: '500ms',
		700: '700ms',
		1000: '1000ms',
		preloaderDurationMain: '60s',
		unset: 'unset',
	},

	// Animation delay (seconds)
	delay: {
		0: '0s',
		75: '75ms',
		100: '100ms',
		150: '150ms',
		200: '200ms',
		300: '300ms',
		500: '500ms',
		700: '700ms',
		1000: '1000ms',
		unset: 'unset',
	},

	stagger: {
		0: 0,
		1: 0.1,
		2: 0.2,
		3: 0.3,
		4: 0.4,
		5: 0.5,
		6: 0.6,
		7: 0.8,
		8: 1,
		9: 1.5,
		10: 0.08,
	},

	// Blur values (pixels)
	blur: {
		0: '0',
		sm: '4px',
		base: '8px',
		md: '12px',
		lg: '16px',
		xl: '24px',
		'2xl': '40px',
		'3xl': '64px',
		none: 'none',
		unset: 'unset',
	},

	// Border width scale
	borderWidth: {
		0: '0',
		1: '1px',
		2: '2px',
		4: '4px',
		8: '8px',
		default: '1px',
		unset: 'unset',
	},

	// Border radius scale
	borderRadius: {
		0: '0',
		sm: '0.125rem', // 2px
		base: '0.25rem', // 4px
		md: '0.375rem', // 6px
		lg: '0.5rem', // 8px
		xl: '0.75rem', // 12px
		'2xl': '1rem', // 16px
		'3xl': '1.5rem', // 24px
		// Pixel values
		'5px': '5px',
		'10px': '10px',
		'15px': '15px',
		'20px': '20px',
		'25px': '25px',
		'30px': '30px',
		full: '9999px',
		none: 'none',
		unset: 'unset',
	},

	// Outline width scale
	outlineWidth: {
		0: '0',
		1: '1px',
		2: '2px',
		4: '4px',
		8: '8px',
		unset: 'unset',
	},

	// Outline offset scale
	outlineOffset: {
		0: '0',
		1: '1px',
		2: '2px',
		4: '4px',
		8: '8px',
		unset: 'unset',
	},

	// Ring width scale (for focus rings)
	ringWidth: {
		0: '0',
		1: '1px',
		2: '2px',
		4: '4px',
		8: '8px',
		default: '3px',
		unset: 'unset',
	},

	// Ring offset scale
	ringOffset: {
		0: '0',
		1: '1px',
		2: '2px',
		4: '4px',
		8: '8px',
		unset: 'unset',
	},

	// Stroke width scale (for SVG)
	strokeWidth: {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		0.1: 0.1,
		0.2: 0.2,
		0.3: 0.3,
		0.4: 0.4,
		0.5: 0.5,
		0.6: 0.6,
		0.7: 0.7,
		0.8: 0.8,
		0.9: 0.9,
		10: 1,
		unset: 'unset',
	},

	// Aspect ratio scale
	aspectRatio: {
		auto: 'auto',
		square: '1 / 1',
		video: '16 / 9',
		portrait: '3 / 4',
		landscape: '4 / 3',
		ultrawide: '21 / 9',
		unset: 'unset',
	},

	// Object position scale
	objectPosition: {
		center: 'center',
		top: 'top',
		right: 'right',
		bottom: 'bottom',
		left: 'left',
		'top-left': 'top left',
		'top-right': 'top right',
		'bottom-left': 'bottom left',
		'bottom-right': 'bottom right',
		unset: 'unset',
	},

	// Columns scale (for multi-column layout)
	columns: {
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		auto: 'auto',
		unset: 'unset',
	},

	// Column gap scale
	columnGap: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		// Pixel values
		'10px': '10px',
		'20px': '20px',
		'30px': '30px',
		normal: 'normal',
		unset: 'unset',
	},

	// Scroll margin scale
	scrollMargin: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		// Pixel values
		'10px': '10px',
		'20px': '20px',
		'30px': '30px',
		unset: 'unset',
	},

	// Scroll padding scale
	scrollPadding: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		// Pixel values
		'10px': '10px',
		'20px': '20px',
		'30px': '30px',
		unset: 'unset',
	},

	// Text indent scale
	textIndent: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		// Pixel values
		'10px': '10px',
		'20px': '20px',
		'30px': '30px',
		unset: 'unset',
	},

	// Backdrop blur scale
	backdropBlur: {
		0: '0',
		sm: 'blur(4px)',
		base: 'blur(8px)',
		md: 'blur(12px)',
		lg: 'blur(16px)',
		xl: 'blur(24px)',
		'2xl': 'blur(40px)',
		'3xl': 'blur(64px)',
		none: 'none',
		unset: 'unset',
	},

	// Brightness scale
	brightness: {
		0: 0,
		50: 0.5,
		75: 0.75,
		90: 0.9,
		95: 0.95,
		100: 1,
		105: 1.05,
		110: 1.1,
		125: 1.25,
		150: 1.5,
		200: 2,
		unset: 'unset',
	},

	// Contrast scale
	contrast: {
		0: 0,
		50: 0.5,
		75: 0.75,
		100: 1,
		125: 1.25,
		150: 1.5,
		200: 2,
		unset: 'unset',
	},

	// Grayscale scale
	grayscale: {
		0: 0,
		50: 0.5,
		100: 1,
		unset: 'unset',
	},

	// Hue rotate scale
	hueRotate: {
		0: '0deg',
		15: '15deg',
		30: '30deg',
		60: '60deg',
		90: '90deg',
		180: '180deg',
		unset: 'unset',
	},

	// Invert scale
	invert: {
		0: 0,
		50: 0.5,
		100: 1,
		unset: 'unset',
	},

	// Saturate scale
	saturate: {
		0: 0,
		50: 0.5,
		100: 1,
		150: 1.5,
		200: 2,
		unset: 'unset',
	},

	// Sepia scale
	sepia: {
		0: 0,
		50: 0.5,
		100: 1,
		unset: 'unset',
	},

	// Drop shadow scale
	dropShadow: {
		sm: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))',
		base: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1)) drop-shadow(0 1px 1px rgba(0,0,0,0.06))',
		md: 'drop-shadow(0 4px 3px rgba(0,0,0,0.07)) drop-shadow(0 2px 2px rgba(0,0,0,0.06))',
		lg: 'drop-shadow(0 10px 8px rgba(0,0,0,0.04)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
		xl: 'drop-shadow(0 20px 13px rgba(0,0,0,0.03)) drop-shadow(0 8px 5px rgba(0,0,0,0.08))',
		'2xl': 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
		none: 'none',
		unset: 'unset',
	},

	// Text shadow scale
	textShadow: {
		sm: '0 1px 2px rgba(0,0,0,0.1)',
		base: '0 2px 4px rgba(0,0,0,0.1)',
		md: '0 4px 6px rgba(0,0,0,0.1)',
		lg: '0 8px 16px rgba(0,0,0,0.1)',
		xl: '0 12px 24px rgba(0,0,0,0.15)',
		none: 'none',
		unset: 'unset',
	},

	// Transition property presets
	transitionProperty: {
		none: 'none',
		all: 'all',
		default:
			'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
		colors: 'background-color, border-color, color, fill, stroke',
		opacity: 'opacity',
		shadow: 'box-shadow',
		transform: 'transform',
		unset: 'unset',
	},

	// Cursor values
	cursor: {
		auto: 'auto',
		default: 'default',
		pointer: 'pointer',
		wait: 'wait',
		text: 'text',
		move: 'move',
		help: 'help',
		notAllowed: 'not-allowed',
		none: 'none',
		grab: 'grab',
		grabbing: 'grabbing',
		unset: 'unset',
	},

	// Caret color values
	caretColor: {
		auto: 'auto',
		transparent: 'transparent',
		current: 'currentColor',
		unset: 'unset',
	},

	// Accent color values
	accentColor: {
		auto: 'auto',
		current: 'currentColor',
		unset: 'unset',
	},

	// Scroll snap align
	scrollSnapAlign: {
		start: 'start',
		end: 'end',
		center: 'center',
		none: 'none',
		unset: 'unset',
	},

	// Scroll snap stop
	scrollSnapStop: {
		normal: 'normal',
		always: 'always',
		unset: 'unset',
	},

	// Scroll snap type
	scrollSnapType: {
		none: 'none',
		x: 'x mandatory',
		y: 'y mandatory',
		both: 'both mandatory',
		xProximity: 'x proximity',
		yProximity: 'y proximity',
		bothProximity: 'both proximity',
		unset: 'unset',
	},

	// Touch action values
	touchAction: {
		auto: 'auto',
		none: 'none',
		panX: 'pan-x',
		panY: 'pan-y',
		pinchZoom: 'pinch-zoom',
		manipulation: 'manipulation',
		unset: 'unset',
	},

	// Will change values
	willChange: {
		auto: 'auto',
		scroll: 'scroll-position',
		contents: 'contents',
		transform: 'transform',
		unset: 'unset',
		opacity: 'opacity',
	},

	// Content values
	content: {
		none: 'none',
		empty: '""',
		unset: 'unset',
	},

	// Line height scale
	lineHeight: {
		0: 0,
		none: 1,
		tight: 1.25,
		snug: 1.375,
		normal: 1.5,
		relaxed: 1.625,
		loose: 2,
		unset: 'unset',
	},

	// Letter spacing scale
	letterSpacing: {
		tighter: '-0.05em',
		tight: '-0.025em',
		normal: '0em',
		wide: '0.025em',
		wider: '0.05em',
		widest: '0.1em',
		unset: 'unset',
	},

	// Font weight scale
	fontWeight: {
		thin: 100,
		extralight: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
		unset: 'unset',
	},

	fontStyles: {
		normal: 'normal',
		italic: 'italic',
		oblique: 'oblique',
		initial: 'initial',
		inherit: 'inherit',
	},

	maskSize: {
		default: '100% 100%',
		double: '200% 200%',
		full: 'cover',
		contain: 'contain',
		custom: value => `${value}`, // for any dynamic value like '150% 250%'
	},

	// Font size scale
	fontSize: {
		xs: '0.75rem', // 12px
		sm: '0.875rem', // 14px
		base: '1rem', // 16px
		lg: '1.125rem', // 18px
		xl: '1.25rem', // 20px
		'2xl': '1.5rem', // 24px
		'3xl': '1.875rem', // 30px
		'4xl': '2.25rem', // 36px
		'5xl': '3rem', // 48px
		'6xl': '3.75rem', // 60px
		'7xl': '4.5rem', // 72px
		'8xl': '6rem', // 96px
		'9xl': '8rem', // 128px
		unset: 'unset',
	},

	// Shadow scale
	boxShadow: {
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
		'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
		none: 'none',
		unset: 'unset',
	},

	// Transition timing functions
	easing: {
		linear: 'linear',
		in: 'cubic-bezier(0.4, 0, 1, 1)',
		out: 'cubic-bezier(0, 0, 0.2, 1)',
		inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
		unset: 'unset',
	},

	// Flex/Grid values
	flex: {
		1: '1 1 0%',
		auto: '1 1 auto',
		initial: '0 1 auto',
		none: 'none',
		unset: 'unset',
	},

	// Order values
	order: {
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		first: -9999,
		last: 9999,
		none: 0,
		unset: 'unset',
	},

	// Grid template columns
	gridCols: {
		1: 'repeat(1, minmax(0, 1fr))',
		2: 'repeat(2, minmax(0, 1fr))',
		3: 'repeat(3, minmax(0, 1fr))',
		4: 'repeat(4, minmax(0, 1fr))',
		5: 'repeat(5, minmax(0, 1fr))',
		6: 'repeat(6, minmax(0, 1fr))',
		12: 'repeat(12, minmax(0, 1fr))',
		none: 'none',
		unset: 'unset',
	},

	// Grid template rows
	gridRows: {
		1: 'repeat(1, minmax(0, 1fr))',
		2: 'repeat(2, minmax(0, 1fr))',
		3: 'repeat(3, minmax(0, 1fr))',
		4: 'repeat(4, minmax(0, 1fr))',
		5: 'repeat(5, minmax(0, 1fr))',
		6: 'repeat(6, minmax(0, 1fr))',
		none: 'none',
		unset: 'unset',
	},

	objectFit: {
		contain: 'contain',
		cover: 'cover',
		fill: 'fill',
		none: 'none',
		scaleDown: 'scale-down',
	},

	clipPath: {
		preloaderInitial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
		preloaderExit: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
		inset0: 'inset(0 0 0 0)',
		insetFull: 'inset(0%)',
		insetBottomHidden: 'inset(0 0 100% 0)', // hides bottom section
		circle: 'circle(50%)',
		ellipse: 'ellipse(50% 50% at 50% 50%)',
		polygon: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
		custom: value => `${value}`, // dynamic custom shape
	},
	transitions: {
		none: 'none',
		all: 'all',
		default: 'cubic-bezier(0.83, 0, 0.17, 1)',
		main: '0.6s all cubic-bezier(0.83, 0, 0.17, 1)',
		mainTransition: '0.6s all cubic-bezier(0.83, 0, 0.17, 1)',
		secondary: '0.6s all cubic-bezier(0.65, 0, 0.35, 1)',
		emph: 'cubic-bezier(0.65, 0, 0.35, 1)',
		fast: '0.2s all cubic-bezier(0.83, 0, 0.17, 1)',
		slow: '1s all cubic-bezier(0.83, 0, 0.17, 1)',
		defaultEase: [0.76, 0, 0.24, 1],
		ease: 'ease',
		easeIn: 'ease-in',
		easeOut: 'ease-out',
		easeInOut: 'ease-in-out',
		linear: 'linear',
		// Transition properties
		property: {
			none: 'none',
			all: 'all',
			colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
			opacity: 'opacity',
			shadow: 'box-shadow',
			transform: 'transform',
		},
		// Transition durations
		duration: {
			75: '75ms',
			100: '100ms',
			150: '150ms',
			200: '200ms',
			300: '300ms',
			500: '500ms',
			700: '700ms',
			1000: '1000ms',
		},
		// Transition delays
		delay: {
			75: '75ms',
			100: '100ms',
			150: '150ms',
			200: '200ms',
			300: '300ms',
			500: '500ms',
			700: '700ms',
			1000: '1000ms',
		},
	},

	stroke: {
		dashArrayFull: 1000,
		dashOffsetFull: 1000,
		dashArrayHalf: 500,
		dashOffsetHalf: 500,
		dashArrayNone: 0,
		dashOffsetNone: 0,
		customDashArray: value => `${value}`,
		customDashOffset: value => `${value}`,
	},
};

const scrollBehavior = {
	auto: 'auto',
	smooth: 'smooth',
	instant: 'instant', // optional, not official in spec but some frameworks use it
	inherit: 'inherit',
	initial: 'initial',
	unset: 'unset',
};

const fills = {
	none: 'none',
	transparent: 'transparent',
	current: 'currentColor',
	primary: colors.primaryColor,
	secondary: colors.secondaryColor,
	white: colors.white.base,
	black: colors.black,
	gray: colors.COLOR_GRAY_222,
	inherit: 'inherit',
};

// Overflow properties
const overflow = {
	auto: 'auto',
	hidden: 'hidden',
	visible: 'visible',
	scroll: 'scroll',
	clip: 'clip',
	ellipsis: 'ellipsis',
};

const overscrollBehavior = {
	auto: 'auto',
	contain: 'contain',
	none: 'none',
	inherit: 'inherit',
	initial: 'initial',
	unset: 'unset',
};

// ============================================================================
// MAIN THEME EXPORT
// ============================================================================
/**
 * Complete design system export
 * Organized for easy access and extension
 */
const theme = {
	// Core systems
	utils,
	grid,
	spacing,
	typography,
	colors,
	animations,
	effects,
	numericScale,
	positioning,
	components,
	layout,
	scale,
	fills,
	overflow,
	backgrounds,
	scrollBehavior,
	overscrollBehavior,
	// Z-index management
	zIndex: positioning.zIndex,

	// Theme variants for different contexts
	variants: {
		light: {
			background: colors.white.base,
			text: colors.theme.secondary.base,
			primary: colors.theme.primary.base,
		},
		dark: {
			background: colors.theme.woodland,
			text: colors.theme.springWood,
			primary: colors.theme.primary.base,
		},
	},

	// Static assets
	assets: {
		images: {
			menuBackground: '/images/static/background_palmal.jpg',
			errorPage: '/images/static/background_palmal.jpg',
			uploadIcon: '/images/static/upload.svg',
			footerTexture: '/images/static/footer-logo-texture.svg',
		},
	},

	// Image aspect ratios
	aspectRatio: {
		blogSingle: 'calc(435 / 370 * 100%)',
		menuItem: 'calc(768 / 568 * 100%)',
		pageBanner: 'calc(600 / 1366  * 100%)',
		pageBannerTab: 'calc(600 / 1023 * 100%)',
		pageBannerMobile: 'calc(600 / 375 * 100%)',
		square: '1 / 1',
		video: '16 / 9',
		portrait: '3 / 4',
		landscape: '4 / 3',
	},
};

export default theme;

/**
 * ============================================================================
 * USAGE EXAMPLES:
 * ============================================================================
 *
 * // Colors
 * theme.colors.theme.primary.base
 * theme.colors.theme.primary[50]
 * theme.colors.semantic.success.base
 *
 * // Typography
 * theme.typography.fonts.primary
 * theme.typography.fontSizes.h1.desktop
 * theme.typography.fontWeights.bold
 *
 * // Spacing
 * theme.spacing.scale[4]
 * theme.spacing.semantic.lg
 *
 * // Layout
 * theme.layout.patterns.flexCenter
 * theme.grid.media.up.md
 *
 * // Components
 * theme.components.button.variants.primary
 * theme.components.card.base
 *
 * // Effects
 * theme.effects.shadows.lg
 * theme.effects.borderRadius.xl
 *
 * // Animations
 * theme.animations.duration.normal
 * theme.animations.easing.smooth
 *
 * // Utilities
 * theme.utils.alpha('#006B00', 0.5)
 * theme.utils.clamp('1rem', '2vw', '2rem')
 *
 * ============================================================================
 */
