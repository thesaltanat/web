'use client';

import styled from 'styled-components';

/**
 * Error Boundary for Route-Level Errors
 *
 * Catches rendering errors in any route segment.
 * Doesn't catch errors in Server Components at fetch time.
 * Must be a Client Component.
 *
 * Props:
 *   - error: Error object with message and stack
 *   - reset: Function to retry the boundary
 */
export default function Error({ error, reset }) {
	return (
		<StyledErrorContainer>
			<div className="error-wrapper">
				<h2 className="error-title">Something went wrong!</h2>
				<p className="error-message">
					{error?.message ||
						'An unexpected error occurred. Please try again.'}
				</p>
				<div className="error-actions">
					<button onClick={() => reset()} className="error-button">
						Try again
					</button>
					<a href="/public" className="error-button-secondary">
						Go back home
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
	min-height: calc(var(--vh, 1vh) * 100);
	padding: 20px;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

	.error-wrapper {
		background: white;
		border-radius: 12px;
		padding: 40px;
		max-width: 500px;
		width: 100%;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.error-title {
		font-size: 24px;
		font-weight: 600;
		color: #e74c3c;
		margin: 0 0 16px 0;
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
		background: #e74c3c;
		color: white;

		&:hover {
			background: #c0392b;
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
