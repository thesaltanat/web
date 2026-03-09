import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
	reactCompiler: true,
	// cacheComponents: true, // Disabled to fix Math.random error in not-found client component
	compiler: {
		styledComponents: {
			ssr: true,
			displayName: true,
			minify: true,
			cssProp: true,
			pure: true,
		},
	},
	devIndicators: {
		autoPrerender: false,
	},
	output: 'standalone',
	crossOrigin: 'anonymous',
	reactStrictMode: true,
	poweredByHeader: false,
	generateEtags: false,

	// ✅ Add env validation
	env: {
		NEXT_PUBLIC_SITE_URL:
			process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'bestinbd.com',
			},
			{
				protocol: 'https',
				hostname: 'bestinbd.com/projects/2509TSL',
			},
			{
				protocol: 'https',
				hostname: 'demo.thesaltanat.com',
			},
			{
				protocol: 'https',
				hostname: 'thesaltanat.com',
			},
			{
				protocol: 'https',
				hostname: '2509-tsl.vercel.app',
			},
			{
				protocol: 'https',
				hostname: 'dcfix.dcastalia.com',
			},

			{
				protocol: 'https',
				hostname: 'dcastalia.com',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				protocol: 'https',
				hostname: 'unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'dgrees.studio',
			},
			{
				protocol: 'https',
				hostname: 'w3schools.com',
			},
			{
				protocol: 'https',
				hostname: 'project.bestinbd.com',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
			}
		],
		minimumCacheTTL: 86400, // 24 hours instead of 60 seconds
		deviceSizes: [640, 750, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		formats: ['image/avif', 'image/webp'], // Prioritize modern formats
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
		loader: 'default',
		path: '/_next/image',
		disableStaticImages: false,
		unoptimized: false,
	},

	pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],

	// Experimental features for better performance
	experimental: {
		scrollRestoration: true,
		serverActions: {},
		viewTransition: true,
		esmExternals: true,
		turbopackFileSystemCacheForDev: true,
		optimizePackageImports: ['framer-motion', 'gsap'],
		webVitalsAttribution: ['CLS', 'LCP'],
	},

	transpilePackages: ['@studio-freight/compono'],

	// Simple webpack configuration without conflicts
	webpack: (config, { dev }) => {
		// SVG handling
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		// Production optimizations
		if (!dev) {
			// Enable tree shaking
			config.optimization.usedExports = true;
			config.optimization.sideEffects = false;
			config.optimization.concatenateModules = true;
		}

		return config;
	},

	httpAgentOptions: {
		keepAlive: false,
	},

	onDemandEntries: {
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 2,
	},

	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},

	// ✅ Enhanced security headers
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'geolocation=(), microphone=(), camera=()',
					},
				],
			},
			{
				source: '/api/(.*)',
				headers: [
					{
						key: 'Content-Type',
						value: 'application/json; charset=utf-8',
					},
					{
						key: 'Cache-Control',
						value: 'public, max-age=0, must-revalidate',
					},
				],
			},
		];
	},

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: process.env.NEXT_PUBLIC_API_URL + '/api/:path*',
			},
		];
	},

	productionBrowserSourceMaps: false,
	compress: true,
};

export default nextConfig;
