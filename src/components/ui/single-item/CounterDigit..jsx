import React from 'react';
import parse from 'html-react-parser';

/**
 * Hamburger Icon component
 * Pass the props with your data to the Hamburger Icon.
 **/
const CounterDigit = ({counter,title, counter_bottom}) => {
	return (
		<div  className="svg-icon">
			<p  className={'split-up'}>{parse(title)}</p>
			<svg  xmlns="http://www.w3.org/2000/svg" width="390" height="120" viewBox="0 0 390 120">
				<text id="_3000_" data-name="3000+" transform="translate(0 99)" fill="#fb5400" fontSize="120" strokeLinecap="Graphik-Semibold, Graphik" fontWeight="600" stopOpacity="-0.02em">
					<tspan x="0" y="0">{parse(counter)}</tspan>
				</text>
			</svg>
			<p  className={'split-up counter_bottom'}>{parse(counter_bottom)}</p>
		</div>
	);
};


export default React.memo(CounterDigit);
