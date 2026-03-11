import React, { lazy } from 'react';

/**
 * ✅ FIXED (Issue #7): Wraps lazy components with error boundaries and fallback UI
 * Prevents unhandled chunk load failures
 * @param {Function} lazyComponent - Result of lazy(() => import(...))
 * @param {string} name - Display name for error messages and fallback
 * @returns {React.Component} - Wrapped component with error handling
 */
export const lazyWithErrorBoundary = (lazyComponent, name = 'Component') => {
	const Component = lazy(lazyComponent);

	const LazyWithBoundary = props => (
		<ErrorBoundary name={name}>
			<Component {...props} />
		</ErrorBoundary>
	);

	LazyWithBoundary.displayName = `LazyWithBoundary(${name})`;
	return LazyWithBoundary;
};

/**
 * Simple Error Boundary for lazy components
 */
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.error(
				`Error loading ${this.props.name}:`,
				error,
				errorInfo,
			);
		}

		// Report to monitoring service in production
		if (typeof window !== 'undefined' && window.Sentry) {
			window.Sentry.captureException(error, {
				contexts: {
					component: {
						name: this.props.name,
						error: error.message,
					},
				},
			});
		}
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="p-6 border-2 border-red-300 bg-red-50 rounded-lg">
					<h3 className="text-lg font-semibold text-red-800 mb-2">
						Failed to Load {this.props.name}
					</h3>
					<p className="text-red-600 text-sm mb-3">
						An error occurred while loading this component.
					</p>
					{process.env.NODE_ENV === 'development' && (
						<details className="text-xs text-red-500 mt-3 p-2 bg-red-100 rounded">
							<summary className="cursor-pointer font-mono">
								Error Details
							</summary>
							<pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-40">
								{this.state.error?.toString()}
							</pre>
						</details>
					)}
					<button
						onClick={() =>
							this.setState({ hasError: false, error: null })
						}
						className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
						Try Again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default lazyWithErrorBoundary;
