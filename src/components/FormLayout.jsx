// javascript
'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { errorToast, successToast } from '@/src/hooks/toastNotifications';
import Button from '@/src/components/ui/Button';
import { Form } from 'react-bootstrap';
import TextInput from '@/src/components/ui/input/TextInput';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import theme from '@/src/styles/theme';

const FormLayout = ({
	padding,
	asModal,
	id,
	pt,
	formData,
	buttonLabel,
	form_id,
	interest,
	career,
}) => {
	const { register, handleSubmit, formState, reset } = useForm({
		mode: 'all',
	});
	const { errors, isSubmitSuccessful } = formState;
	const [isSubmitting, setIsSubmitting] = useState(true);
	const [selectResponseData, setSelectResponseData] = useState(null);
	const [selectUploadMessage, setSelectUploadMessage] = useState('Attach Your Resume');
	const cvRef = useRef(null);
	const [cv, setCv] = useState(null);

	const onSubmit = async e => {
		setIsSubmitting(true);
		try {
			const data = new FormData();
			Object.entries(e).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					data.append(key, value);
				}
			});

			if (cv) {
				data.append('file', cv);
			}
			data.append('form_id', form_id ? form_id : 'contact-form');
			const response = await axios.post(
				process.env.NEXT_PUBLIC_API_URL +
					'/api/post-req-data/form-submit',
				data,
			);
			setSelectResponseData(response);

			if (response?.data?.result === 'success') {
				reset();
				setCv(null);
				setSelectUploadMessage('Attach CV');
				if (cvRef.current) cvRef.current.value = ''; // allowed: set to empty string to clear file input
			} else if (response?.data?.result === 'error') {
				errorToast(
					response?.data?.message ||
						'An error occurred. Please try again.',
				);
			}
		} catch (err) {
			errorToast(
				err?.message
					? err?.message
					: 'Failed to submit form. Please try again later.',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const onError = errors => {
		const count = Object.values(errors).length;
		if (count > 0) {
			errorToast('Please fill out the correct inputs');
		}
	};

	useEffect(() => {
		if (selectResponseData?.error) {
			errorToast(selectResponseData.error);
		}
		if (selectResponseData?.data?.result === 'success') {
			successToast(selectResponseData.data?.message);
		}
	}, [selectResponseData]);

	// handleUpload: use onChange and don't set input.value
	function handleUpload(event) {
		const selectedFile = event.target.files?.[0] ?? null;
		setCv(selectedFile);
		if (selectedFile) {
			setSelectUploadMessage(selectedFile.name);
			document.querySelector('.gph_upload')?.classList.add('hide');
		} else {
			setSelectUploadMessage('Attach CV');
		}
	}

	return (
		<StyledListWithForm
			pt={pt}
			id={`${id ? id : 'ListWithForm'}`}
			className={`list_with_form ${asModal ? 'asModal' : ''} ${padding ? padding : ''} `}>
			<Form className={'form'} onSubmit={handleSubmit(onSubmit, onError)}>
				<input name={'spam_protector'} type="hidden" />
				<input name={'form_id'} value={'contact-form'} type="hidden" />

				{formData &&
					formData?.length > 0 &&
					formData?.map((e, index) => {
						let fieldName = e?.field_key;
						const required = e?.validators
							?.split(',')
							.map(f => f.trim());
						const requiredField = required?.includes('required');

						return (
							<Fragment key={index}>
								{e?.field_type === 'textArea' ? (
									<TextInput
										key={index}
										name={fieldName}
										as={'textarea'}
										placeholder={`${e?.placeholder}`}
										register={register}
										validation={{
											required: requiredField
												? `${e?.label} is Required`
												: false,
										}}
										error={errors[fieldName]}
									/>
								) : e?.field_type === 'fileInput' ? (
									<Form.Group
										className={'form-group upload-file'}>
										<div className="file-form-wrapper">
											<label htmlFor="file">
												<span>Upload Your Resume</span>
												<span>DOC/PDF <b>||</b>Max 2MB</span>
											</label>
											<input
												ref={cvRef}
												onChange={handleUpload}
												data-text={selectUploadMessage}
												className={'upload_button'}
												id={'file-input'}
												type="file"
												accept="application/pdf"
											/>
										</div>
									</Form.Group>
								) : fieldName === 'subject' && interest ? (
									<TextInput
										key={index}
										name={fieldName}
										placeholder={`${requiredField ? e?.placeholder + '*' : e?.placeholder}`}
										register={register}
										value={interest}
										validation={{
											required: requiredField
												? `${e?.label} is Required`
												: false,
										}}
										error={errors[fieldName]}
									/>
								) : (
									<TextInput
										key={index}
										name={fieldName}
										placeholder={`${requiredField ? e?.placeholder + '*' : e?.placeholder}`}
										register={register}
										validation={{
											required: requiredField
												? `${e?.label} is Required`
												: false,
										}}
										error={errors[fieldName]}
									/>
								)}
							</Fragment>
						);
					})}

				<div className={`form-group ${career ? 'career-button' : ''}`}>
					<div
						className={'submit-wrapper'}
						onSubmit={handleSubmit(onSubmit, onError)}
						onClick={handleSubmit(onSubmit, onError)}>
						<Button
							inLineColor={'#363229'}
							outLineColor={theme.colors.theme.colorFive.base}
							background={theme.colors.theme.colorFive.base}
							outLineHoverColor={'#363229'}
							inLineHoverColor={theme.colors.theme.colorFive.base}
							color="#263322"
							text={buttonLabel ? buttonLabel : 'Submit message'}
							margin={'50px 0 0'}
							src={'javascript:void()'}
						/>
					</div>
				</div>
			</Form>
		</StyledListWithForm>
	);
};

const StyledListWithForm = styled.div`
	position: ${theme.positioning.type.relative};

	.file-form-wrapper {
		label {
			display: inline-flex;
			gap: 45px;
			color: white;
			opacity: 1;
			font-weight: 400;
			font-size: 16px;
			line-height: 20px;
			letter-spacing: 0;
			text-transform: capitalize;

			span {
				b{
					margin: 0 10px;
				}
				&:last-child {
					color: rgba(255, 255, 255, 0.5);
					
				}
			}
		}
	}

	&.asModal {
		form {
			.form-group {
				&:nth-of-type(2) {
					max-width: calc(100% - 15px);
					flex: 0 0 calc(100% - 15px);
				}

				&:nth-of-type(3) {
					max-width: calc(100% - 15px);
					flex: 0 0 calc(100% - 15px);
				}
			}
		}
	}

	form {
		.form-control {
			color: white !important;
			border-bottom: 1px solid rgba(255, 255, 255, 0.5) !important;

			&:focus {
				box-shadow: none;
				border-color: rgba(255, 255, 255, 1) !important;
			}

			&::placeholder {
				color: rgba(255, 255, 255, 0.5) !important;
			}
		}

		.form-group {
			max-width: calc(100% - 15px);
			flex: 0 0 calc(100% - 15px);

			&:nth-of-type(2) {
				max-width: calc(50% - 15px);
				flex: 0 0 calc(100% - 15px);
			}

			&:nth-of-type(3) {
				max-width: calc(50% - 15px);
				flex: 0 0 calc(100% - 15px);
			}
		}

		.career-button {
			max-width: calc(60% - 15px);
			flex: 0 0 calc(60% - 15px);

			.dc-btn {
				margin: 10px 0 0 !important;
				@media (max-width: 767px) {
					margin-top: 15px !important;
				}
			}
		}

		.upload-file {
			max-width: calc(40% - 15px);
			flex: 0 0 calc(40% - 15px);

			label {
				margin-bottom: 15px;
			}

			ul {
				color: ${theme.colors.theme.primary.base};
				font-size: 0.65rem;
				font-style: normal;
				font-weight: 400;
				line-height: 1rem; /* 200% */
				text-transform: capitalize;
				list-style: none;
			}
		}

		ul {
			margin-top: 12px !important;
			list-style: none !important;

			li {
				list-style: none;
			}
		}

		.upload_button {
			position: ${theme.positioning.type.relative};
			cursor: ${theme.numericScale.cursor.pointer};
			border: none !important;
			overflow: ${theme.overflow.hidden} !important;
			width: ${theme.numericScale.width.full} !important;
			height: 40px !important;
			font-size: 0;

			&:after {
				position: ${theme.positioning.type.absolute};
				inset: 0;
				content: attr(data-text); /* use data-text attribute */
				font-weight: 500;
				font-size: 1rem; /* 16px */
				line-height: 1.5rem; /* 24px */
				letter-spacing: 0;
				text-transform: capitalize;
				color: ${theme.colors.white.base};
				z-index: 1;
				display: ${theme.layout.display.flex};
				-webkit-box-align: ${theme.layout.flex.center};
				align-items: ${theme.layout.flex.align.center};
				-webkit-box-pack: ${theme.layout.flex.center};
				justify-content: flex-start;
				width: ${theme.numericScale.width.full};
				padding-left: 50px;
			}

			&:before {
				content: '';
				background-image: url("${theme.assets.images.uploadIcon}");
				width: 40px;
				height: 40px;
				background-repeat: no-repeat;
				background-size: 40px;
				position: ${theme.positioning.type.absolute};
				background-color: ${theme.colors.white.base};
				display: ${theme.layout.display.flex};
				align-items: ${theme.layout.flex.center};
				justify-content: ${theme.layout.flex.center};
				background-position: ${theme.layout.flex.center};
				z-index: 11;
				background-size: 25px;
				background-position: center;
			}
		}
	}
`;

export default React.memo(FormLayout);
