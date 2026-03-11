// components/ui/themeLayout.jsx

/**
 * ThemeLayout - Bootstrap-based layout component with dynamic gutter control
 *
 * Usage:
 * <ThemeLayout
 *   fluid // Use container-fluid, omit for container
 *   flex // Enable flex on Row
 *   flexWrap="wrap"
 *   flexDirection="row"
 *   justifyContent="center"
 *   alignItems="center"
 *   colData={['Col 1', 'Col 2', 'Col 3']} // Array for columns
 *   columns={3} // Number of columns (optional, auto from colData)
 *   colClassName="my-col-class"
 *   colSizes={{ xs: 12, md: 4 }} // Custom column sizes
 *   colOffsets={{ md: { offset: 2 } }} // Custom offsets
 *   containerClass="my-container"
 *   rowClass="my-row"
 *
 *   // Gutter Control (NEW)
 *   gutter={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} // Responsive gutters
 *   globalGutter={3} // Global gutter for all breakpoints
 *   colPadding={{ xs: 2, md: 4 }} // Custom column padding
 *   globalColPadding={3} // Global column padding
 *   noGutters={false} // Disable all gutters
 * >
 * </ThemeLayout>
 *
 * Gutter/Padding Options:
 * - gutter: Responsive gutter sizes (0-6 for Bootstrap spacing)
 * - globalGutter: Single gutter value for all breakpoints
 * - colPadding: Responsive column padding
 * - globalColPadding: Single padding value for all columns
 * - noGutters: Remove all gutters completely
 *
 * Breakpoints: xs, sm, md, lg, xl, xxl
 * Spacing Scale: 0, 1, 2, 3, 4, 5, 6 (Bootstrap spacing utilities)
 */

import classNames from 'classnames';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const ThemeLayout = ({
	fluid = false,
	containerClass = '',
	containerID = null,
	containerProps = {},
	rowClass = '',
	rowProps = {},
	rowStyles = {},
	flex = true,
	flexWrap = 'wrap',
	flexDirection = 'row',
	justifyContent = 'start',
	alignItems = 'stretch',
	colData = null, // Array of content for each column
	colClassName = '',
	colProps = {},
	colStyles = {},
	columns = null, // Number of columns if colData is not used
	colSizes = { xs: 12 }, // Custom sizes
	colOffsets = {},

	// Gutter Control Props
	gutter = null, // { xs: 2, md: 4 } - Responsive gutters
	globalGutter = null, // Single gutter value for all breakpoints
	colPadding = null, // { xs: 2, md: 4 } - Responsive column padding
	globalColPadding = null, // Single padding value for all columns
	noGutters = false, // Remove all gutters

	children,
}) => {
	// Helper function to generate responsive gutter classes
	const generateGutterClasses = () => {
		const classes = [];

		if (noGutters) {
			classes.push('g-0');
			return classes.join(' ');
		}

		if (globalGutter !== null) {
			classes.push(`g-${globalGutter}`);
			return classes.join(' ');
		}

		if (gutter && typeof gutter === 'object') {
			Object.entries(gutter).forEach(([breakpoint, value]) => {
				if (breakpoint === 'xs') {
					classes.push(`g-${value}`);
				} else {
					classes.push(`g-${breakpoint}-${value}`);
				}
			});
		}

		return classes.join(' ');
	};

	// Helper function to generate column padding classes
	const generateColPaddingClasses = () => {
		const classes = [];

		if (globalColPadding !== null) {
			classes.push(`p-${globalColPadding}`);
			return classes.join(' ');
		}

		if (colPadding && typeof colPadding === 'object') {
			Object.entries(colPadding).forEach(([breakpoint, value]) => {
				if (breakpoint === 'xs') {
					classes.push(`p-${value}`);
				} else {
					classes.push(`p-${breakpoint}-${value}`);
				}
			});
		}

		return classes.join(' ');
	};

	// Container class
	const containerClassName = classNames(
		containerClass,
		containerProps.className,
		{
			'container-fluid': fluid,
			container: !fluid,
		},
	);

	// Row class with gutter controls
	const gutterClasses = generateGutterClasses();
	const rowClassName = classNames(
		rowClass,
		rowProps.className,
		gutterClasses,
	);

	// Column padding classes
	const colPaddingClasses = generateColPaddingClasses();

	// Row style for flex options
	const computedRowStyles = {
		display: flex ? 'flex' : undefined,
		flexWrap,
		flexDirection,
		justifyContent,
		alignItems,
		...rowStyles,
	};

	// Render columns
	const renderColumns = () => {
		const finalColClassName = classNames(colClassName, colPaddingClasses);

		if (colData && Array.isArray(colData)) {
			const colWidth = columns
				? Math.floor(12 / columns)
				: Math.floor(12 / colData.length);
			return colData.map((data, idx) => (
				<Col
					key={`col-${idx}`}
					className={finalColClassName}
					style={colStyles}
					{...colProps}
					xs={colWidth}
					{...(colSizes || {})}
					{...(colOffsets.xs || {})}>
					{data}
				</Col>
			));
		}

		if (columns) {
			const colWidth = Math.floor(12 / columns);
			return Array.from({ length: columns }).map((_, idx) => (
				<Col
					key={`col-${idx}`}
					className={finalColClassName}
					style={colStyles}
					{...colProps}
					xs={colWidth}>
					{children}
				</Col>
			));
		}

		// If children are provided but no colData/columns, render children directly
		// This allows for <ThemeLayout><Col>...</Col></ThemeLayout> usage
		if (children && !colData && !columns && Object.keys(colSizes).length === 1 && colSizes.xs === 12) {
			return children;
		}

		// Use colSizes for custom column widths if no columns or colData provided
		return Object.entries(colSizes).map(([size, width]) => (
			<Col
				key={`col-${size}`}
				className={finalColClassName}
				style={colStyles}
				{...colProps}
				{...(colOffsets[size] || {})}
				{...{ [size]: width }}>
				{children}
			</Col>
		));
	};

	return (
		<Container
			id={containerID || undefined}
			className={containerClassName}
			fluid={fluid}
			{...containerProps}>
			<Row
				className={rowClassName}
				style={computedRowStyles}
				{...rowProps}>
				{renderColumns()}
			</Row>
		</Container>
	);
};

export default React.memo(ThemeLayout);
