'use client';

import FormLayout from '@/src/components/FormLayout';
import BodyText from '@/src/components/ui/BodyText';
import Title from '@/src/components/ui/Title';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { SingleImage } from '@/src/components/ui/SingleImage';
import Link from 'next/link';
/**
 * Gallery form template component
 * Props:
 *  - images: array of { src, alt } objects
 *  - title: string
 *
 * This uses the project's `Title` component for the heading and provides a
 * lightweight, dependency-free lightbox (named `LightGallery` locally) so we
 * don't have to rely on external wrappers. Clicking a thumbnail opens the
 * modal; arrow keys navigate and Esc closes.
 */
const FormTemplate = ({ title = 'Gallery', data }) => {

	const dataAvailable = useShowSetting()
	const formData = dataAvailable?.getSettings?.data?.form_list?.find(form => form.form_id === data?.section_data?.form_id || form.form_id === data?.data?.form_id)


	return (
		<StyledFormTemplate>
			<Container fluid>
				<Row>
					<Col md={{span: 6}}>
						<Link href={'https://www.google.com/maps'}>
							<div className="image-wrapper-contact">
								<SingleImage
									src={
										data?.section_data?.image?.url
											? data?.section_data?.image?.url
											: data?.data?.image?.url || '/images/static/contact_us.svg'
									}
									alt={
										data?.section_data?.image?.alt
											? data?.section_data?.image?.alt
											: data?.data?.image?.alt
									}
								/>
							</div>
						</Link>
					</Col>
					<Col md={{span: 6}} className="form_template__content">
						<Title
							color={theme.colors.white.base}
							text={
								data?.section_data?.subtitle
									? data?.section_data?.subtitle : data?.data?.subtitle ? data?.data?.subtitle
									: title
							}
							tag="h2"
							margin={'0 0 60px 0'}
							textTransform="uppercase"
							animate={true}
						/>

						{
							data?.section_data?.short_desc &&
							// eslint-disable-next-line react/no-children-prop
							<BodyText as={'p'}  children={parse(data?.section_data?.short_desc)} color={theme.colors.white.base} margin={'0 0 40px 0'} />

						}

						<FormLayout formId={formData?.form_id} formData={formData?.fields} />
					</Col>
				</Row>
			</Container>
		</StyledFormTemplate>
	);
};

const StyledFormTemplate = styled.section`
    //background-image: url('/images/static/contact_us.svg');
    //background-size: contain;
    //background-position: left bottom;	
    background-repeat: no-repeat;
	background-color: #141A12;
	
	.form_template__content{
		padding: 200px 15px;
	}
	
	.image-wrapper-contact{
		position: relative;
		padding-top: calc(650 / 1000 * 100%);
		height: 100%;
		&:after{
			width: 50%;
			height: 100%;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			content: '';
			background: linear-gradient(114deg, rgba(20, 26, 18, 0.00) 15.88%, #141A12 48.28%);
		}
	}

    ${theme.grid.media.down.tab} {
        .form_template__content {
          
        }
    }

    ${theme.grid.media.down.md} {
		.form_template__content{
			padding: 100px 15px;
		}
		
		.image-wrapper-contact{
			padding-top: calc(500 / 315 * 100%);
		}

		.form_template__content {
            width: 100% !important;
            max-width: 100% !important;
            margin-left: 0 !important;
        }
    }

`;

export default FormTemplate;
