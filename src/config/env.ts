// Centralized environment configuration helpers
export const isServer = typeof window === 'undefined';

// Public API base URL used across the app for server/client fetches
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Optional: site/base URL for building absolute links when needed
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

