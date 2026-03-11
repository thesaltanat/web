import React, { lazy, memo, useMemo } from 'react';

// Component registry for dynamic imports
const COMPONENT_REGISTRY = {
	hero_banner: () => import('@/src/modules/HeroBanner'),
	gallery: () => import('../../modules/gallery'),
	gallery_template: () => import('../../modules/gallery'),
	slider_template_1: () => import('../../modules/slider_template_1'),
	// 'slider_template_2': () => import('../../modules/slider_template_2'), // Now uses index.js
	testimonial: () => import('../../modules/testimonial'),
	feature_list: () => import('../../modules/feature_list'),
	partners: () => import('../../modules/Partners'),
	booknow: () => import('../../modules/booknow'),
	form_template: () => import('../../modules/form_template'),
	page_banner: () => import('../../modules/page_banner/PageBanner.v1'),
	art_of_escap: () => import('../../modules/TextImageParallaxSection'),
	general_template: () => import('../../modules/GeneralTemplate'),
};

/**
 * Error component for failed loads
 */
const ErrorComponent = memo(({ type, error }) => (
	<div className="p-6 border border-red-200 bg-red-50 rounded-lg">
		<h3 className="text-lg font-medium text-red-800 mb-2">
			Component Load Error
		</h3>
		<p className="text-red-600 mb-2">
			Failed to load component:{' '}
			<code className="bg-red-100 px-1 rounded">{type}</code>
		</p>
		{process.env.NODE_ENV === 'development' && error && (
			<details className="text-sm text-red-500">
				<summary className="cursor-pointer">Error Details</summary>
				<pre className="mt-2 whitespace-pre-wrap">
					{error.toString()}
				</pre>
			</details>
		)}
	</div>
));
ErrorComponent.displayName = 'ErrorComponent';

/**
 * Lazy component wrapper with error boundary
 */
const LazyComponent = memo(({ loader, fallback, ...props }) => {
	const Component = useMemo(() => {
		return lazy(() =>
			loader().catch(error => {
				// eslint-disable-next-line no-console
				console.error('Failed to load component:', error);
				// Return a fallback component that shows the error
				return {
					default: () => (
						<ErrorComponent type={props.type} error={error} />
					),
				};
			}),
		);
	}, [loader, props.type]);

	return <Component {...props} />;
});
LazyComponent.displayName = 'LazyComponent';

/**
 * Component factory for dynamic component creation
 * @param {Object} section - Section data with type and other props
 * @returns {React.Component}
 */
export const ComponentFactory = memo(({ section, ...additionalProps }) => {
	const { type, template, ...sectionProps } = section || {};

	// Determine component type
	const componentType = type || template;
	const normalizedType = componentType
		? componentType.toLowerCase().trim()
		: '';


	if (!componentType) {
		return (
			<ErrorComponent
				type="unknown"
				error={new Error('No component type specified')}
			/>
		);
	}

	const componentLoader = COMPONENT_REGISTRY[normalizedType];

	if (!componentLoader) {
		return (
			<ErrorComponent
				type={componentType}
				error={
					new Error(
						`Component type "${componentType}" not found in registry`,
					)
				}
			/>
		);
	}

	return (
		<LazyComponent
			loader={componentLoader}
			type={componentType}
			{...sectionProps}
			{...additionalProps}
		/>
	);
});
ComponentFactory.displayName = 'ComponentFactory';

/**
 * Batch component renderer for multiple sections
 */
export const BatchComponentRenderer = memo(
	({ sections = [], className = '' }) => {
		if (!Array.isArray(sections) || sections.length === 0) {
			return null;
		}

		return (
			<div className={className}>
				{sections.map((section, index) => (
					<ComponentFactory
						key={section.id || section.uuid || index}
						section={section}
						sectionIndex={index}
					/>
				))}
			</div>
		);
	},
);
BatchComponentRenderer.displayName = 'BatchComponentRenderer';

/**
 * Register new component in the registry
 * @param {string} type - Component type
 * @param {Function} loader - Dynamic import function
 */
export function registerComponent(type, loader) {
	COMPONENT_REGISTRY[type.toLowerCase()] = loader;
}

/**
 * Get all registered component types
 * @returns {string[]}
 */
export function getRegisteredTypes() {
	return Object.keys(COMPONENT_REGISTRY);
}

export default ComponentFactory;
