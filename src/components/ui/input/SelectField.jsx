import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { Form } from 'react-bootstrap';
import Select from 'react-select';
import styled from 'styled-components';

// eslint-disable-next-line react/display-name
const SelectField = forwardRef(
	(
		{
			selectedValue,
			clear,
			onChange,
			disabled,
			prev_id,
			color,
			placeholder,
			selection,
			option,
			background,
			border,
			value,
		},
		ref,
	) => {
		const selectLocationInputRef = useRef();
		const filterboxRef = useRef(null);
		const [selectMenuLoc, setSelectMenuLoc] = useState('auto');

		const customStyles = {
			dropdownIndicator: (base, state) => ({
				...base,
				transition: 'all .2s cubic-bezier(.74,0,.24,.99)',
				transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
				padding: '0 8px',
			}),
			control: (provided, state) => ({
				...provided,
				minHeight: '50px',
				borderRadius: 0,
				border: 'none',
				borderBottom: state.menuIsOpen
					? '1px solid #000'
					: '1px solid rgba(0, 0, 0, 0.2)',
				backgroundColor: 'transparent',
				boxShadow: 'none',
				cursor: 'pointer',
				paddingTop: '0px',
				'&:hover': {
					borderBottom: '1px solid #000',
				},
			}),
			option: (provided, state) => ({
				...provided,
				borderRadius: 0,
				color: state.isSelected ? '#7D5A50' : '#000',
				backgroundColor: 'transparent',
				margin: 0,
				fontSize: '16px',
				cursor: 'pointer',
				lineHeight: '1.5',
				padding: '12px 20px',
				fontWeight: state.isSelected ? 600 : 400,
				borderBottom: 'none',
				'&:hover': {
					backgroundColor: 'rgba(125, 90, 80, 0.1)',
					color: '#7D5A50',
				},
			}),
			menu: (provided, state) => ({
				...provided,
				backgroundColor: '#fff',
				margin: '0',
				padding: '10px 0',
				borderRadius: 0,
				fontSize: '16px',
				lineHeight: '1.5',
				zIndex: 10,
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
			}),
			menuList: (provided, state) => ({
				...provided,
				backgroundColor: '#fff',
				fontWeight: '400',
				fontSize: '16px',
				lineHeight: '1.5',
				padding: '0',
				maxHeight: '300px',
				overflowY: 'auto',
				scrollbarWidth: 'thin',
				'&::-webkit-scrollbar': {
					width: '6px',
				},
				'&::-webkit-scrollbar-track': {
					background: '#f1f1f1',
				},
				'&::-webkit-scrollbar-thumb': {
					background: '#888',
					borderRadius: '3px',
				},
				'&::-webkit-scrollbar-thumb:hover': {
					background: '#555',
				},
			}),
			placeholder: provided => ({
				...provided,
				color: '#999',
				fontSize: '12px',
				fontWeight: 400,
				position: 'absolute',
				top: '8px',
				left: '0',
				textTransform: 'uppercase',
				letterSpacing: '0.5px',
			}),
			singleValue: provided => ({
				...provided,
				color: '#000',
				fontSize: '16px',
				fontWeight: 400,
				marginTop: '18px',
				textTransform: 'capitalize',
			}),
			indicatorSeparator: () => ({
				display: 'none',
			}),
		};

		useEffect(() => {
			const handleScroll = e => {
				if (selectLocationInputRef.current?.select?.state?.menuIsOpen) {
					e.preventDefault();
					e.stopPropagation();
				}
			};

			window.addEventListener('wheel', handleScroll, { passive: false });

			return () => {
				window.removeEventListener('wheel', handleScroll);
			};
		}, []);

		const handleLocation = e => {
			if (onChange) {
				onChange(e);
			}
		};

		return (
			<StyledSelectField
				className={'selector-custom-nzuac'}
				background={background}>
				<div className="form-group" ref={filterboxRef}>
					<Form.Group controlId="formBasicPhone">
						<Select
							isDisabled={!!disabled}
							classNamePrefix="filter"
							ref={selectLocationInputRef}
							isSearchable={false}
							menuPlacement={selectMenuLoc}
							isClearable={!!clear}
							options={selection}
							value={value}
							onChange={e => {
								handleLocation(e);
							}}
							placeholder={`${placeholder ? placeholder : 'Select Location'}`}
							styles={customStyles}
						/>
					</Form.Group>
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
		padding: 0;

		@media (max-width: 992px) {
			max-width: 100%;
		}

		.filter__value-container {
			padding-left: 0;
			padding-right: 0;
			padding-top: 0px;
			padding-bottom: 8px;
		}

		.filter__placeholder {
			margin: 0;
			color: #999;
			font-size: 12px;
			font-weight: 400;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			position: absolute;
			top: 8px;
			left: 0;
		}

		.filter__single-value {
			margin: 0;
			color: #000;
			font-size: 16px;
			font-weight: 400;
			text-transform: capitalize;
			margin-top: 18px;
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
		border-bottom: 1px solid #000 !important;
	}

	.filter__menu {
		margin-top: 4px;
		border-radius: 0;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
`;

export default React.memo(SelectField);
