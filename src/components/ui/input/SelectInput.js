import React from 'react';
import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';
import styled from 'styled-components';
import theme from '@/src/styles/theme';

// eslint-disable-next-line react/display-name
const SelectInput = React.forwardRef(({name, placeholder, options, onChange, error, selectedValue, width}, ref) => {

    const CaretDownIcon = () => {
        return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9.5" transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)" stroke="#152637" />
                <path d="M13.5703 9.96448L10.0348 13.5" stroke="#152637" strokeLinecap="round" />
                <path d="M10.0352 13.5L6.49962 9.96447" stroke="#152637" strokeLinecap="round" />
                <path d="M10 13.5L10 6.5" stroke="#152637" strokeLinecap="round" />
            </svg>

        );
    };

    const customStyles = {
        dropdownIndicator: (base, state) => ({
            ...base,
            transition: 'all .2s cubic-bezier(.74,0,.24,.99)',
            transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
        }),
        option: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            color: state.isSelected ? `${theme.colors.theme.hoverColor.base}` : theme.colors.black.base,
            backgroundColor: state.isSelected ? theme.colors.hover : theme.colors.white.base,
            margin: 0,
            fontSize: 18,
            cursor: 'pointer',
            lineHeight: '18px',
            paddingLeft: 10,
            paddingRight: 10,
            fontWeight: state.isSelected ? 400 : 400,
            borderBottom: state.options.indexOf(state.data) === state.options.length - 1 ? 'none' : '1px solid #888888', // Check if it's the last item

            '&:hover': {
                backgroundColor: `${theme.colors.hover}`,
                color: `${theme.colors.white}`,
                cursor: 'pointer'
            },

        }), menu: (provided, state) => ({
            ...provided,
            color: '#888888',
            backgroundColor: state.isSelected ? `${theme.colors.white.base}` : theme.colors.white.base,
            margin: '15px 0 0 0',
            borderBottom: `1px solid ${theme.colors.hover}`,
            padding: 0,
            borderRadius: 10,
            fontSize: 12,
            zIndex: 10,

            // width: 200,
        }), menuList: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? `${theme.colors.theme.hoverColor.base}` : theme.colors.white.base,
            borderRadius: 10,
            borderColor: `${theme.colors.text}`,
            fontWeight: '400',
            color: state.isSelected ? `${theme.colors.theme.hoverColor.base}` : theme.colors.white.base,
            padding: 0,
            fontSize: 12,
        }),

    };


    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon/>
            </components.DropdownIndicator>
        );
    };

    const types = [
        {value: 'commercial', label: 'Commercial'},
        {value: 'residential', label: 'Residential'},
    ];

    const handleLocation = (e) => {
        // Remove the following line:
        // setSelectLocation(e);

        // Invoke the onChange callback with the selected value
        if (onChange) {
            onChange(e);
        }
    };






    return (
            <StyledSelectField width={width}>
            <div className="form-group">
                <Form.Group>
                    <Select
                        classNamePrefix="filter"
                        ref={ref}
                        options={options ? options : types}
                        styles={customStyles}
                        isSearchable={false}
                        onChange={e => {
                            handleLocation(e);
                        }}
                        placeholder={placeholder}
                        components={{DropdownIndicator}}
                        value={selectedValue !== undefined ? (options ? options : types).find(option => option.value === selectedValue) : null}
                    />
                    {error && <span className="error-message form-error">{error.message}</span>}
                </Form.Group>
            </div>
            </StyledSelectField>

        )
    }
);
const StyledSelectField = styled.div`
	width: ${props => props.width || '100%'};
	
    .filter__control{
        background: #EFEFEF;
        border-radius: 30px;
        height: 56px;
        padding: 0 25px;
        box-shadow: none;
		width: ${props => props.width || '100%'};
        &:hover{
            border-color: unset;
        }
        .filter__single-value{
            font-weight: 500;
            font-size: 1rem;         /* 16px */
            line-height: 1.5rem;     /* 24px */
            letter-spacing: 0;
            color: #152637;
        }
        .filter__placeholder{
            font-weight: 500;
            font-size: 1rem;         /* 16px */
            line-height: 1.5rem;     /* 24px */
            letter-spacing: 0;
            color: #152637;
        }
        .filter__indicator-separator{
            display: none;
        }
        .filter__value-container{
            padding: 0;
        }
        .filter__indicator{
            padding: 0;
        }
    }
`;

export default React.memo(SelectInput);