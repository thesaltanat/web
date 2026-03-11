// components/FontPreloader.jsx
import React from 'react';

// components/FontPreloader.jsx
// This component preloads all font files declared in app/global.css.
// Ensures fonts are loaded early for better performance and no FOUT (Flash of Unstyled Text).
// Should be included in your main layout or _app.js/_app.tsx.

// Fonts listed here must match those declared in app/global.css.
const fonts = [
	'Cammron-Regular',
	'Cammron-Bold',
	'Mosvita-SemiBold',
	'Mosvita-Regular',
	'Mosvita-Medium',
	'Mosvita-Light',
	'Mosvita-Bold',
];

const FontPreloader = () => (
	<>
		{/* Preload both .woff and .woff2 formats for each font.
            These files must exist in the public/fonts directory. */}
		{fonts.map(font => (
			<React.Fragment key={font}>
				<link
					rel="preload"
					href={`/fonts/${font}.woff`}
					as="font"
					type="font/woff"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href={`/fonts/${font}.woff2`}
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
			</React.Fragment>
		))}
	</>
);

export default React.memo(FontPreloader);
