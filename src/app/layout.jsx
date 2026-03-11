import 'bootstrap/dist/css/bootstrap.min.css';
import 'haspr-cursor/dist/cursor.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';

import theme from '@/src/styles/theme';
import FontPreloader from '@/src/utils/FontPreloader';
import StyledComponentsRegistry from '../../lib/registry';
import ClientRoot from './ClientRoot';
import Providers from './Providers';

import ServiceWorkerUnregister from './ServiceWorkerUnregister';

export const metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
	),
	title: {
		default: process.env.SITENAME || 'Saltanat Group Limited',
		template: '%s | ' + (process.env.SITENAME || 'Saltanat'),
	},
	description:
		process.env.SITENAMEDESCRIPTION ||
		'Immerse yourself in calm waters that mirror the open sky.',
	keywords:
		process.env.NEXT_PUBLIC_KEYWORD ||
		'The Saltanat Inn investment opportunity',
	authors: [{ name: process.env.AUTHOR || 'The Saltanat' }],
	creator: process.env.AUTHOR || 'The Saltanat',
	icons: {
		icon: '/images/static/favicon-16x16.png',
		apple: '/images/static/favicon-16x16.png',
	},
	manifest: '/manifest.json',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
		title: process.env.SITENAME || 'Saltanat Group Limited',
		description:
			process.env.SITENAMEDESCRIPTION ||
			'Immerse yourself in calm waters that mirror the open sky.',
		images: [
			{
				url: '/images/static/logo.svg',
				width: 1200,
				height: 630,
				alt: process.env.SITENAME || 'Saltanat Group Limited',
				type: 'image/svg+xml',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: process.env.SITENAME || 'Saltanat Group Limited',
		description:
			process.env.SITENAMEDESCRIPTION ||
			'Immerse yourself in calm waters that mirror the open sky.',
		images: ['/images/static/logo.svg'],
		creator: '@' + (process.env.AUTHOR || 'saltanat'),
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		title: process.env.SITENAME,
	},
	formatDetection: {
		telephone: false,
		date: false,
		email: false,
		address: false,
	},
};
export const viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#EEECE3' },
		{ media: '(prefers-color-scheme: dark)', color: '#EEECE3' },
	],
};
export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Immediate scroll restoration disable and reset */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
							if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
								history.scrollRestoration = 'manual';
							}
							// Force immediate scroll to top
							if (typeof window !== 'undefined') {
								window.scrollTo(0, 0);
								document.documentElement.scrollTop = 0;
							window.scrollTo(0, 0);

							}
						`,
					}}
				/>
				<title>{process.env.SITENAME}</title>

				{/* Preload critical fonts */}
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
					crossOrigin="anonymous"
				/>

				{/* Preload critical font files */}
				<link
					rel="preload"
					href="/fonts/Mosvita-Regular.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/Cammron-Regular.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>

				{/* Theme color for light mode */}
				<meta
					name="theme-color"
					content={theme.colors.theme.primary.base}
					media="(prefers-color-scheme: light)"
				/>
				{/* Theme color for dark mode */}
				<meta
					name="theme-color"
					content={theme.colors.theme.primary.base}
					media="(prefers-color-scheme: dark)"
				/>
				{/* Additional security headers */}
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>

				{/* Verification Tags */}
				<meta
					name="facebook-domain-verification"
					content={'some_facebook_verification_code'}
				/>
				<meta
					name="google-site-verification"
					content={'some_google_verification_code'}
				/>
			</head>
			<body suppressHydrationWarning>
				<ServiceWorkerUnregister />
				{/* Move FontPreloader into the body since it's a client component */}
				<FontPreloader />
				<StyledComponentsRegistry>
					{/* ClientRoot now handles all data fetching */}
					<Providers>
						<ClientRoot>{children}</ClientRoot>
					</Providers>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
