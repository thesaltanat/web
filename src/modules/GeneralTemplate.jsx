/**
 * GeneralTemplate - Bootstrap-based layout component
 *

 */

import React from 'react';
import styled from "styled-components";
import Title from '@/src/components/ui/Title';
import Button from '@/src/components/ui/Button';
import Hamburger from '@/src/components/ui/Hamburger';

const GeneralTemplate = ({data}) => {
    return (
        <StyledGeneralTemplate>
			<Title animate={false} text={"Large Title"} tag={'h0'} margin={'0 0 20px'}/>
            <Title animate={false} text={"H1"} tag={'h1'} margin={'0 0 20px'}/>
			<Title animate={false} text={"H2"} tag={'h2'} margin={'0 0 20px'}/>
			<Title animate={false} text={"H3"} tag={'h3'} margin={'0 0 20px'}/>
			<Title animate={false} text={"H4"} tag={'h4'} margin={'0 0 20px'}/>
			<Title animate={false} text={"H5"} tag={'h5'} margin={'0 0 20px'}/>
			<Title animate={false} text={"H6"} tag={'h6'} margin={'0 0 20px'}/>
			<Title animate={true} text={"HEADER"} tag={'header'} margin={'0 0 20px'}/>
			<Title animate={false} text={"SUB HEADER"} tag={'subheader'} margin={'0 0 20px'}/>
			<Title animate={false} text={"SUB TEXT"} tag={'subtext'} margin={'0 0 20px'}/>
			<Title animate={false} text={"Body"} tag={'p'} margin={'0 0 20px'}/>
			<br/>
			<br/>
			<h5>Buttons</h5>
			<Button src={'/'} text={'Get In Touch'}/>
			<br/>
			<br/>
			<div className="hamburger" style={{background: '#000', padding: '20px', display: 'inline-block'}}>
				<Hamburger/>
			</div>
        </StyledGeneralTemplate>
    );
};

const StyledGeneralTemplate = styled.section`
    min-height: 200vh;
`;
export default React.memo(GeneralTemplate);