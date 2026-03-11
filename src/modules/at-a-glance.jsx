"use client";

import { Col, Container, Row } from "react-bootstrap";
import parse from "html-react-parser";
import styled from "styled-components";
import Title from '@/src/components/ui/Title';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';

export default function AtAGlance({data, product}) {


    return (
        <StyledWrapper>
            <Container>
                <Row>
                    <Col md={12} className={'text-center'}>
                        <Title animate={true} color={'white'} textTransform={'uppercase'} center={'true'} text={parse(data?.data?.title || 'At A Glance')} tag={'h3'} margin={'0 0 70px'}/>

                    </Col>
					<Col md={{span: 8, offset: 2}}>
						{
							product?.specifications && product?.specifications?.length > 0 &&
							<ul>
								{
									product?.specifications?.map((item, index) => {

										return(
											<li key={index}>
												<p>{parse(item.item_title)}:</p>
												<p>{parse(item.item_value)}</p>
											</li>
										)
									})
								}
							</ul>
						}
					</Col>
                </Row>
            </Container>
			<div className="image-wrapper">
				<SingleImageParallax
					src={
						'/images/dynamic/at_a_glance.jpg'
					}
					alt={data?.images?.list?.find(img => img.background === 'on')?.short_title || 'At A Glance Background'}
				/>
			</div>
        </StyledWrapper>
    );
}


const StyledWrapper = styled.section`
    position: relative;
    padding: 150px 0 0;
    //padding: 150px 0 calc(1000 / 1366 * 100%);
	background: linear-gradient(166.13deg, #21261D 34.92%, rgba(33, 38, 29, 0) 90.69%),
	linear-gradient(215.88deg, #21261D 13.92%, rgba(33, 38, 29, 0) 73.36%);
	.image-wrapper{
		padding-top: calc(1000 / 1366 * 100%);
		position: relative;
		width: 100%;
		z-index: -1;
		inset: 0;
		height: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		img{
		}
		
		@media(max-width: 1025px){
			padding-top: calc(950 / 568 * 100%);
		}
	}
    ul{
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        justify-content: space-between;
        li{
            flex: 0 0 calc(100% - 20px);
            width: calc(100% - 20px);
            display: flex;
            gap: 15px;
			justify-content: space-between;
            border-bottom: 1px solid #FFFDFD36;
            p{
                color: white;
            }
        }
    }

    @media (max-width: 992px){
      ul{
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: space-between;
        li{
            flex: 0 0 calc(100% - 15px);
            width: calc(100% - 15px);
            display: flex;
            gap: 15px;
            border-bottom: 1px solid #FFFDFD36;
            p{
                color: white;
                &:first-child{
                  min-width: 30vw;
                }
            }
        }
    }
    }

    @media(max-width: 767px){
		padding: 100px 0 80%;
		.image-wrapper{
			top: unset !important;
			bottom: 0 !important;
			padding-top: 50vh;
			position: absolute;
		}
    }
`;