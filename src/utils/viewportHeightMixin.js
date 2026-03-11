/**
 * Mobile Viewport Height Utilities
 *
 * These utilities provide styled-components helpers for mobile-safe viewport height
 * They use the CSS custom property --vh which is dynamically set by useViewportHeight hook
 */

/**
 * Full viewport height (100vh) with mobile fix
 * Usage: css`${viewportHeightMixin.fullHeight}`
 */
export const fullHeight = `
  height: calc(var(--vh, 1vh) * 100);
  
  @supports (height: 100vh) {
    /* Fallback for browsers that don't support CSS custom properties */
    height: 100vh;
  }
`;

/**
 * Minimum full viewport height (min-height: 100vh) with mobile fix
 * Usage: css`${viewportHeightMixin.minFullHeight}`
 */
export const minFullHeight = `
  min-height: calc(var(--vh, 1vh) * 100);
  
  @supports (height: 100vh) {
    /* Fallback for browsers that don't support CSS custom properties */
    min-height: 100vh;
  }
`;

/**
 * Dynamic viewport height (50%, 75%, etc.) with mobile fix
 * Usage: css`${viewportHeightMixin.height(50)}`
 */
export const height = (percentage = 100) => `
  height: calc(var(--vh, 1vh) * ${percentage});
`;

/**
 * Dynamic minimum viewport height
 * Usage: css`${viewportHeightMixin.minHeight(75)}`
 */
export const minHeight = (percentage = 100) => `
  min-height: calc(var(--vh, 1vh) * ${percentage});
`;

/**
 * Maximum viewport height
 * Usage: css`${viewportHeightMixin.maxHeight(100)}`
 */
export const maxHeight = (percentage = 100) => `
  max-height: calc(var(--vh, 1vh) * ${percentage});
`;

/**
 * Default export object for convenient usage
 */
const viewportHeightMixin = {
	fullHeight,
	minFullHeight,
	height,
	minHeight,
	maxHeight,
};

export default viewportHeightMixin;

