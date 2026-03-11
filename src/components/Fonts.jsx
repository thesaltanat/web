'use client';

import {Col, Container, Row} from 'react-bootstrap';

import styled from 'styled-components';
import Button from '@/src/components/ui/Button';
import BodyText from "@/src/components/ui/BodyText";
import Subheader from '@/src/components/ui/subheader';
import SubText from '@/src/components/ui/subtext';
import Title from '@/src/components/ui/Title';
const MyComponent = () => {
    return (
        <StyledComponent className={'post-wrap'}>
            <Container>
                <Row>
                    <Col>
                        <div className="post-wrap__single">
                            <Title text={"H1"} tag={'h1'} margin={'0 0 20px'}/>
                            <Title text={"H2"} tag={'h2'} margin={'0 0 20px'}/>
                            <Title text={"H3"} tag={'h3'} margin={'0 0 20px'}/>
                            <Title text={"H4"} tag={'h4'} margin={'0 0 20px'}/>
                            <Title text={"H5"} tag={'h5'} margin={'0 0 20px'}/>
                            <Title text={"H6"} tag={'h6'} margin={'0 0 20px'}/>
                            <Subheader margin={'0 0 20px'} text={"Sub Header Example"}/>
                            <SubText margin={'0 0 20px'} text={"Sub Text Example"}/>
                            <br/><br/>
                            <h5>Body Text</h5>

                            <BodyText as={'p'}>
                                {"  Palmal Group of Industries is one of Bangladesh’s leading garment manufacturers, known\n" +
                                    "                                for its vertically integrated operations and large-scale production. With 30+ factories\n" +
                                    "                                and 25,000+ employees, we handle everything from knitting and dyeing to finishing and\n" +
                                    "                                export—ensuring consistent quality at every stage. Our legacy spans over three decades\n" +
                                    "                                of growth, trust, and global partnerships.\n" +
                                    "                                <br/><br/>\n" +
                                    "                                Beyond manufacturing, we’re driven by purpose. Our investments in green energy, ethical\n" +
                                    "                                practices, and employee welfare reflect a deep commitment to sustainable progress. At\n" +
                                    "                                Palmal, every thread tells a story of innovation, responsibility, and shared success.\n" +
                                    "                            "}
                            </BodyText>

                            <br/> <br/>
                            <h5>All buttons</h5>
                            <Button
                                text="Get In Touch"
                                src="https://google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => console.log('Button clicked!')}
                                variant="normal"
                            />
                            <Button src={'/'} text={'Our Concerns'} color={'#0A2619'} background={'transparent'} />
                            <Button src={'/'} text={'Get In Touch'}/>
                            <Button src={'/'} text={'Learn More'} variant={'circle'} color={'#402D17'} background={'transparent'}/>
                            {/* UI Components Showcase */}
                            <div style={{marginTop: '40px'}}>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </StyledComponent>
    );
};

export default MyComponent;

const StyledComponent = styled.section`
    margin-top: 100px;

    .col-sm-4 {
        margin-bottom: 30px;
    }

    .post-wrap__single {
        border: 1px solid #ddd;
        min-height: 100%;
        padding: 20px;
        position: relative;
    }
`;
