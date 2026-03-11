import { Col, Container, Row } from 'react-bootstrap';

import theme from '@/src/styles/theme';
import React from 'react';
import styled from 'styled-components';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI

		return { hasError: true };
	}

	componentDidCatch() {
		// You can use your own error logging service here
	}

	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<StyledErrorPage className="StyledErrorPage">
					{/*<SingleImage alt={'Error Page'} src={'/images/static/404.jpg'} />*/}
					<Container>
						<Row>
							<Col
								sm={{ span: 12 }}
								className={
									'd-flex align-items-center justify-content-center flex-column'
								}>
								<h2>Oops, there is an error!</h2>
								{/*<Button*/}
								{/*	margin={'40px 0 0 0'}*/}
								{/*	marginSm={'30px 0 0 0'}*/}
								{/*	src={'javascript:void(0)'}*/}
								{/*	onClick={() => {*/}
								{/*		this.setState({ hasError: false });*/}
								{/*		window.location.reload();*/}
								{/*	}}*/}
								{/*	text=" Try again?"*/}
								{/*/>*/}
							</Col>
						</Row>
					</Container>
				</StyledErrorPage>
			);
		}

		// Return children components in case of no error

		return this.props.children;
	}
}

const StyledErrorPage = styled.div`
	background: ${theme.colors.gray[200]};
	position: ${theme.positioning.type.relative};
	padding: 225px 0;
	min-height: ${`100svh`};
	overflow: ${theme.overflow.hidden};
	overflow: auto;
	text-align: center;
	display: ${theme.layout.display.flex};
	align-items: ${theme.layout.flex.align.center};
	justify-content: ${theme.layout.flex.justify.center};
	
	@media (max-width: 768px) {
		overflow: auto;
	}

	h2 {
		color: ${theme.colors.white.base};
		margin-bottom: 40px;
	}

	p {
		color: ${theme.colors.white.base};
	}

	${theme.grid.media.tablet} {
		.col-sm-8 {
			min-width: 100%;
			margin: 0;
		}
	}
	${theme.grid.media.mobile} {
		h1 {
			font-size: 80px;
			line-height: 80px;
		}
	}
`;

export default ErrorBoundary;
