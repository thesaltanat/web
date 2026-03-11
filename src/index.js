// Export optimized components
export { default as OptimizedImage } from './components/base/OptimizedImage';
export { default as OptimizedButton } from './components/base/OptimizedButton';
export { ComponentFactory, BatchComponentRenderer, registerComponent, getRegisteredTypes } from './components/factory/ComponentFactory';

// Export services
export * from '../src/services';

// Export optimized hooks
export * from './hooks/data/useApiData';

// Export animations (existing)
export * from '../src/animations';

// Export performance utilities
export * from '@/src/utils/performance';