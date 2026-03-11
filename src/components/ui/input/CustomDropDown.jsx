import React, { forwardRef, useEffect, useRef, useState } from 'react';

import theme from '@/src/styles/theme';
import styled from 'styled-components';

// eslint-disable-next-line react/display-name
const SelectField = forwardRef(
	(
		{
			selection = [],
			placeholder = 'Select',
			disabled = false,
			onChange,
			onFocus,
			onBlur,
			onMenuOpen,
			onMenuClose,
			value: controlledValue,
			background,
		},
		ref,
	) => {
		const containerRef = useRef(null);
		const controlRef = useRef(null);
		const [isOpen, setIsOpen] = useState(false);
		const [selected, setSelected] = useState(() => {
			if (controlledValue == null) return null;
			// controlledValue might be value or whole option
			return (
				selection.find(
					opt =>
						opt.value ===
						(controlledValue?.value ?? controlledValue),
				) ?? null
			);
		});

		// keep internal selected in sync with controlled value
		useEffect(() => {
			if (controlledValue == null) {
				setSelected(null);
				return;
			}
			const found = selection.find(
				opt =>
					opt.value === (controlledValue?.value ?? controlledValue),
			);
			setSelected(found ?? null);
		}, [controlledValue, selection]);

		// close on outside click
		useEffect(() => {
			const onDocClick = e => {
				if (!containerRef.current) return;
				if (!containerRef.current.contains(e.target)) {
					setIsOpen(false);
				}
			};
			document.addEventListener('mousedown', onDocClick);
			return () => document.removeEventListener('mousedown', onDocClick);
		}, []);

		// Handle menu open/close callbacks
		useEffect(() => {
			if (isOpen) {
				if (onMenuOpen) onMenuOpen();
			} else {
				if (onMenuClose) onMenuClose();
			}
		}, [isOpen, onMenuOpen, onMenuClose]);

		const toggleOpen = e => {
			if (disabled) return;
			setIsOpen(prev => !prev);
		};

		const handleSelect = option => {
			setSelected(option);
			setIsOpen(false);
			if (onChange) onChange(option);
		};

		const handleFocus = e => {
			if (onFocus) onFocus(e);
		};

		const handleBlur = e => {
			if (onBlur) onBlur(e);
		};

		const handleKeyDown = e => {
			if (disabled) return;
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggleOpen();
			} else if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		return (
			<StyledSelectField
				className={'selector-custom-nzuac'}
				background={background}>
				<div className="form-group" ref={containerRef}>
					{/* Control */}
					<div
						className={`filter__control ${disabled ? 'filter--is-disabled' : ''} ${
							isOpen ? 'filter__control--is-focused' : ''
						}`}
						ref={node => {
							controlRef.current = node;
							if (typeof ref === 'function') ref(node);
							else if (ref) ref.current = node;
						}}
						role="button"
						tabIndex={disabled ? -1 : 0}
						onClick={toggleOpen}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}>
						{/* floating label / placeholder */}
						<div className="filter__placeholder">
							{placeholder
								? placeholder.toString().toUpperCase()
								: ''}
						</div>

						<div className="d-flex single-value-wrapper">
							{/* selected value shown slightly below (bottom indication) */}
							<div className="filter__single-value">
								{selected ? selected.label : 'All'}
							</div>

							{/* caret indicator */}
							<div
								className="filter__indicator"
								aria-hidden="true"
								style={{
									transform: isOpen
										? 'rotate(180deg)'
										: 'none',
								}}>
								<svg
									viewBox="0 0 24 24"
									width="20"
									height="20"
									fill="none"
									stroke="currentColor">
									<polyline
										points="6 9 12 15 18 9"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Menu */}
					{isOpen && !disabled && (
						<div
							className="filter__menu"
							role="listbox"
							aria-activedescendant={selected?.value}>
							<div
								className="filter__menu-list"
								style={{ padding: 0 }}>
								{selection.map(opt => (
									<div
										key={opt.value}
										role="option"
										aria-selected={
											selected?.value === opt.value
										}
										onClick={() => handleSelect(opt)}
										onKeyDown={e => {
											if (e.key === 'Enter')
												handleSelect(opt);
										}}
										tabIndex={0}
										style={{
											padding: '7px 20px',
											cursor: 'pointer',
											background:
												selected?.value === opt.value
													? 'rgba(125,90,80,0.06)'
													: 'transparent',
											fontWeight:
												selected?.value === opt.value
													? 600
													: 400,
										}}>
										{opt.label}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</StyledSelectField>
		);
	},
);

const StyledSelectField = styled.div`
	position: relative;
	width: 100%;

	.form-group {
		margin: 0;
	}

	.single-value-wrapper {
		position: relative;
		top: 0;
		align-items: center;
		justify-content: space-between;
	}

	.filter--is-disabled {
		cursor: not-allowed;
		opacity: 0.5;

		.filter__placeholder,
		.filter__single-value {
			color: rgba(0, 0, 0, 0.4) !important;
		}
	}

	.filter__control {
		position: relative;
		outline: none !important;
		box-shadow: none !important;
		cursor: pointer;
		width: 100%;
		min-height: 50px;
		padding: 0 0 65px;
		border-bottom: 1px solid #00000000 !important;
		transition: ${theme.mainTransition};
		@media (max-width: 992px) {
			max-width: 100%;
		}
		@media (max-width: 767px) {
			max-width: 100%;
			padding: 0 0 30px;
			border-bottom: 1px solid #000 !important;
		}
		.filter__value-container {
			padding-left: 0;
			padding-right: 0;
			padding-top: 0px;
			padding-bottom: 8px;
		}

		.filter__placeholder {
			margin: 0;
			color: #000;
			font-size: 0.8rem;
			font-weight: 400;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			position: absolute;
			top: 8px;
			left: 0;
		}

		.filter__single-value {
			margin: 0;
			color: #999;
			font-size: 0.8rem;
			font-weight: 400;
			text-transform: capitalize;
			position: relative;
			top: 40px;
			@media (max-width: 767px) {
				top: 25px;
			}
		}

		.filter__indicator {
			padding: 0 8px;

			svg {
				width: 20px;
				height: 20px;
				color: #000;
			}
		}
	}

	.filter__control--is-focused {
		/* border-bottom: 1px solid #0000000 !important; */
	}

	.filter__menu {
		margin-top: 4px;
		border-radius: 0;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		position: absolute;
		width: 100%;
		top: 105px;
		z-index: 9;
		font-size: 0.8rem;
		line-height: 1.2;
		background: linear-gradient(180.2deg, #f8f7f5 25.14%, #f1ece1 102.55%);
		@media (max-width: 767px) {
			top: 50px;
		}
	}
`;

export default React.memo(SelectField);
