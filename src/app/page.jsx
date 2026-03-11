import ErrorPage from '@/src/components/404';
import RenderedSection from '@/src/render/RenderedSection';
import { apiService } from '@/src/services';
import parse from 'html-react-parser';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

function safeParseHtml(htmlString) {
	if (!htmlString || typeof htmlString !== 'string') return '';
	try {
		return parse(htmlString);
	} catch {
		return htmlString;
	}
}

// ✅ Separate async component that runs inside <Suspense>
async function HomeContent() {
	let getHomeData = null;

	try {
		// Using new optimized ApiService with caching
		getHomeData = await apiService.get(
			'/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=yes&gallery=no',
			{
				cache: true,
				ttl: 10 * 60 * 1000, // 10 minutes cache for homepage
			},
		);
	} catch (error) {
		console.error('[HomeContent] API Error:', error.message);
		getHomeData = { success: false, error: error.message };
	}

	// Robust check for valid data
	if (
		!getHomeData ||
		!getHomeData.success ||
		!getHomeData.data?.page_data
	) {
		console.error(
			'[HomeContent] Failed to load data:',
			getHomeData?.error || 'Missing page_data',
		);
		return <ErrorPage />;
	}

	return <RenderedSection data={getHomeData.data} />;
}

// ✅ This function is not async anymore
export default function HomePage() {
	return <HomeContent />;
}

// ✅ generateMetadata can still run async safely
export async function generateMetadata() {
	let getHomeData;

	try {
		// Using new optimized ApiService with caching
		getHomeData = await apiService.get(
			'/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=yes&gallery=no',
			{
				cache: true,
				ttl: 10 * 60 * 1000, // 10 minutes cache for homepage metadata
			},
		);
	} catch (error) {
		getHomeData = { error: error.message, data: {} };
	}

	const meta = getHomeData?.data?.page_data || {};
	return {
		title: {
			default: meta?.meta_title
				? safeParseHtml(meta?.meta_title)
				: process.env.NEXT || '',
		},
		description: safeParseHtml(meta?.meta_description) || '',
		openGraph: {
			title: meta?.og_title || '',
			description: safeParseHtml(meta?.og_description) || '',
			metadataBase: new URL('https://thesaltanat.com/'),
			alternates: {
				canonical: '/',
			},
			images: [
				{
					url: meta?.og_image || '',
					alt: meta?.meta_title || '',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: meta.og_title || meta.meta_title || 'Home',
			description:
				meta.og_description ||
				meta.meta_description ||
				'Welcome to our website',
			images: [meta.og_image || '/images/static/logo.svg'],
		},
		// 👇 Pass JSON-LD Schema safely
		other: {
			schemaJson: meta?.custom_schema_json || '',
		},
	};
}
