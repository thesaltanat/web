	import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Title from '@/src/components/ui/Title';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import parse from 'html-react-parser';
import FormLayout from '@/src/components/FormLayout';
const ApplyForRole = ({ data }) => {
	const dataAvailable = useShowSetting()
	const formData = dataAvailable?.getSettings?.data?.form_list?.find(form => form.form_id === data?.section_data?.form_id)


  return (
    <StyledApplyForRole
      className="ApplyForRole" id={'applyForRole'}
    >
      <Container className={'jobDetails'}>
        <Row>
          <Col md={10}>
            <div className="form-wrapper-apply">
				{
					data?.section_data?.subtitle &&
					<Title tag={'h2'} textTransform={'uppercase'} color={'#FFFFFF'} text={parse(data?.section_data?.subtitle)} margin={'0 0 60px'} />
				}
              <FormLayout buttonLabel={'Apply Now'} form_id={formData?.form_id} formData={formData?.fields}/>
              <p data-scroll data-scroll-repeat className={'note paragraph'}>
                By applying for this job listing, you agree to our Data Privacy Policy for recruitment and job
                applications.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledApplyForRole>
  );
};

const StyledApplyForRole = styled.section`
	padding: 160px 0 160px;
	position: relative;
	background: #0C2610;

	.jobDetails {
		p {
			margin-bottom: 60px;
		}

		ul {
			padding-left: 15px;
			margin-bottom: 60px;

			li {
				list-style: disc;
				margin-bottom: 20px;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}

	.form-wrapper-apply {
		form {
			width: 100%;
		}

		.note {
			color: #EFEFEF;
			font-size: 10px;
			font-style: normal;
			font-weight: 300;
			letter-spacing: 0;
			line-height: 15px;
			margin: 0;
		}

		h6 {
			color: #F0F0F0;
			font-family: "Ivy Mode";
			font-size: 50px;
			font-style: normal;
			font-weight: 400;
			line-height: 104%;
			letter-spacing: -1.15px;
			margin-bottom: 60px;
		}

		.form-group {
			width: 100%;
			max-width: calc(50% - 15px) !important;
			flex: 0 0 calc(50% - 15px) !important;
			margin-bottom: 40px;

			&:last-child {
				max-width: calc(100% - 15px) !important;
				flex: 0 0 calc(100% - 15px) !important;
				margin-bottom: 40px;
			}

			ul {
				margin: 0;
			}

			&.upload-file {
				label {
					color: #F4F4F4;
					font-size: 0.88rem;
					font-style: normal;
					font-weight: 400;
					line-height: 1rem;
				}
			}

			.form-control {
				color: #F4F4F4;
				border-bottom: 1px solid #F4F4F4;
				font-size: 0.88rem;
				font-style: normal;
				font-weight: 400;
				line-height: 1rem;
				padding-bottom: 20px;

				&::placeholder {
					color: #fff !important;
					font-size: 0.88rem;
					font-style: normal;
					font-weight: 400;
					line-height: 1rem;
				}
			}

			.dc-btn {
				margin-top: 0 !important;

				a {
					margin-top: 0 !important;
					border-color: #FFF;
					color: #FFF;
				}
			}
		}
	}

	.dc-btn {
		a:after {
			background: #FFF;
		}

		&:hover {
			a {
				span {
					color: black;
				}
			}
		}
	}

	@media (max-width: 992px) {
		.col-md-7, .col-md-5 {
			max-width: 100%;
			flex: 0 0 100%;
		}
	}

	@media (max-width: 767px) {
		padding-top: 100px;
		padding-bottom: 100px;
		.col-md-6 {
			margin-bottom: 30px;
		}

		.form-wrapper-apply {
			padding: 0;

			.form-group {
				max-width: calc(100% - 15px) !important;
				flex: 0 0 calc(100% - 15px) !important;
			}
		}
	}
`;

export default React.memo(ApplyForRole);