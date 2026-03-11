'use client';

import styled from 'styled-components';

/**
 * Global Error Boundary for Root Layout Failures
 *
 * Catches errors in the root layout.jsx itself.
 * This is the most restrictive error boundary - fallback for critical errors.
 * Must include <html> and <body> tags.
 * Rarely triggered (root layout errors are uncommon).
 *
 * Props:
 *   - error: Error object with message and stack
 *   - reset: Function to retry the boundary
 */
export default function GlobalError({ error, reset }) {
	return (
		<html>
			<body>
				<StyledGlobalErrorContainer>
					<div className="error-wrapper">
						<h1 className="error-title">Critical Error</h1>
						<p className="error-message">
							{error?.message ||
								'A critical error occurred. The application needs to be restarted.'}
						</p>
						<div className="error-description">
							<p>
								We apologize for the inconvenience. Please try
								to refresh the page.
							</p>
						</div>
						<div className="error-actions">
							<button
								onClick={() => reset()}
								className="error-button">
								Refresh Application
							</button>
							<button
								onClick={() => (window.location.href = '/')}
								className="error-button-secondary">
								Go to Homepage
							</button>
						</div>
					</div>
				</StyledGlobalErrorContainer>
			</body>
		</html>
	);
}

const StyledGlobalErrorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: calc(var(--vh, 1vh) * 100);
	padding: 20px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	font-family:
		-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;

	.error-wrapper {
		background: white;
		border-radius: 12px;
		padding: 50px 40px;
		max-width: 550px;
		width: 100%;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
		text-align: center;
	}

	.error-title {
		font-size: 32px;
		font-weight: 700;
		color: #764ba2;
		margin: 0 0 16px 0;
	}

	.error-message {
		font-size: 18px;
		color: #333;
		line-height: 1.6;
		margin: 0 0 16px 0;
		font-weight: 600;
	}

	.error-description {
		font-size: 14px;
		color: #666;
		line-height: 1.8;
		margin: 0 0 32px 0;

		p {
			margin: 0;
		}
	}

	.error-actions {
		display: flex;
		gap: 12px;
		flex-direction: column;

		@media (min-width: 480px) {
			flex-direction: row;
		}
	}

	.error-button,
	.error-button-secondary {
		padding: 12px 24px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		display: inline-block;
		transition: all 0.3s ease;

		@media (min-width: 480px) {
			flex: 1;
		}
	}

	.error-button {
		background: #764ba2;
		color: white;

		&:hover {
			background: #6a3f95;
			transform: translateY(-2px);
			box-shadow: 0 10px 20px rgba(118, 75, 162, 0.2);
		}
	}

	.error-button-secondary {
		background: #f0f0f0;
		color: #764ba2;

		&:hover {
			background: #e8e8e8;
			transform: translateY(-2px);
		}
	}
`;
