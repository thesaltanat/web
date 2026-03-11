'use client';
import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-bootstrap';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import parse from 'html-react-parser';
import Button from '@/src/components/ui/Button';
import Title from '@/src/components/ui/Title';

const JobList = ({ data }) => {
	const globalData = useShowSetting()
	const JobList = globalData?.getSettings?.data?.job_list;

	return (
		<StyledJobList className="JobList" data-scroll-section>
			<div className="fix-it" data-scroll data-scroll-direction={'vertical'} data-scroll-speed="3">
				<img src="/images/static/stone-texture-unique-stone-colo.png" alt="" />
			</div>
			<Container>

				<Row>
					<Col md={12}>
						{
							data?.section_data?.subtitle &&
							<Title tag={'h2'} textTransform={'uppercase'} color={'#4D3E2D'} text={parse(data?.section_data?.subtitle)} margin={'0 0 60px'} />
						}
					</Col>
					<Col md={{ span: 9, offset: 3 }}>

						{
							JobList && JobList?.length > 0 &&
							JobList?.map((e, index) => {
								return (
									<div key={index} className={'job-item-single'}>
										<Title tag={'subheader'} textTransform={'uppercase'} color={'#2F4232'} text={e?.title} margin={'0 0 30px'} />
											<p>{e?.overview}</p>
										<Button  margin={'50px 0 0'} src={`#applyForRole`} text={'Apply Now'} />
									</div>
								);
							})
						}
					</Col>
				</Row>

			</Container>
		</StyledJobList>
	);
};

const StyledJobList = styled.section`
    padding: 160px 0 200px;
	background-color: #FAF8F2;
    //background: linear-gradient(180deg, #FFFDFA 0%, #EEE4D9 100%);
    position: relative;

    .fix-it {
        position: absolute;
        left: 0;
        bottom: 0;
		z-index: 0;
        will-change: transform;
		
	}
	


    .job-item-single {
		border-bottom: 1px solid #40503161;
		padding-bottom: 60px;
		margin-bottom: 60px;
   		p{
			color: #363229;
		}
    }

    .blog-single {
        margin-bottom: 70px;

        @media (max-width: 767px) {
            margin-bottom: 30px;
        }
    }
	
	@media(max-width: 1025px){
		padding: 100px 0 450px;
		
	}

    @media (max-width: 767px) {
        padding: 100px 0 500px;

    }

`;



export default React.memo(JobList);
