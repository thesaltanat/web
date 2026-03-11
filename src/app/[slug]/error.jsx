'use client';

import styled from 'styled-components';

/**
 * Error Boundary for /[slug] Dynamic Route
 *
 * Catches errors specific to dynamic page routes.
 * Shows a message with context about the page loading failure.
 */
export default function Error({ error, reset }) {
	return (
		<StyledErrorContainer>
			<div className="error-wrapper">
				<h2 className="error-title">Page Not Found</h2>
				<p className="error-message">
					{error?.message ||
						'The page you requested could not be found or loaded. It may have been removed or moved.'}
				</p>
				<div className="error-actions">
					<button onClick={() => reset()} className="error-button">
						Try again
					</button>
					<a href="/public" className="error-button-secondary">
						Go home
					</a>
				</div>
			</div>
		</StyledErrorContainer>
	);
}

const StyledErrorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 60vh;
	padding: 40px 20px;
	background: #f9fafb;

	.error-wrapper {
		background: white;
		border-radius: 12px;
		padding: 40px;
		max-width: 500px;
		width: 100%;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
		text-align: center;
		border-left: 4px solid #8b5cf6;
	}

	.error-title {
		font-size: 20px;
		font-weight: 600;
		color: #8b5cf6;
		margin: 0 0 12px 0;
	}

	.error-message {
		font-size: 14px;
		color: #666;
		line-height: 1.6;
		margin: 0 0 24px 0;
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
		padding: 10px 20px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
		display: inline-block;
		transition: all 0.3s ease;

		@media (min-width: 480px) {
			flex: 1;
		}
	}

	.error-button {
		background: #8b5cf6;
		color: white;

		&:hover {
			background: #7c3aed;
		}
	}

	.error-button-secondary {
		background: #ecf0f1;
		color: #333;

		&:hover {
			background: #d5dbdb;
		}
	}
`;
