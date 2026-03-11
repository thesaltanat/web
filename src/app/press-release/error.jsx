'use client';

import styled from 'styled-components';

/**
 * Error Boundary for /press-release Route
 *
 * Catches errors specific to the press release listing page.
 * Shows a message relevant to the press release context.
 */
export default function Error({ error, reset }) {
	return (
		<StyledErrorContainer>
			<div className="error-wrapper">
				<h2 className="error-title">Failed to Load Press Releases</h2>
				<p className="error-message">
					{error?.message ||
						'We encountered an issue loading the press releases. Please try again.'}
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
		border-left: 4px solid #06b6d4;
	}

	.error-title {
		font-size: 20px;
		font-weight: 600;
		color: #06b6d4;
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
		background: #06b6d4;
		color: white;

		&:hover {
			background: #0891b2;
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
