import { MetadataRoute } from 'next';

/**
 * Robots Metadata Route
 *
 * Defines which pages search engines (Google, Bing, etc.) can crawl.
 * Auto-generates robots.txt at the root when deployed.
 *
 * This file tells search engines:
 * - Which pages to crawl (Allow)
 * - Which pages to skip (Disallow)
 * - Where the sitemap is located
 *
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL || 'https://thesaltanat.com';

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/admin', '/private', '/api', '/auth', '/dashboard'],
			},
			{
				userAgent: 'AdsBot-Google',
				allow: '/',
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
