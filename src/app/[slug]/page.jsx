import ErrorPage from '@/src/components/404';
import RenderedSection from '@/src/render/RenderedSection';
import { apiService } from '@/src/services';
import parse from 'html-react-parser';

// 🧩 Safe HTML parser to handle meta fields
function safeParseHtml(htmlString) {
	if (!htmlString || typeof htmlString !== 'string') return '';
	try {
		return parse(htmlString);
	} catch {
		return htmlString;
	}
}

// ✅ Metadata generator stays async — safe on the server
export async function generateMetadata({ params: paramsPromise }) {
	const params = await paramsPromise;
	try {
		// Using new optimized ApiService with caching
		const pageData = await apiService.get(
			`/api/get-req-data/sections?type=slug&value=${params?.slug}&get_section=yes&image=yes&post=yes&file=yes&gallery=no`,
			{
				cache: true,
				ttl: 10 * 60 * 1000, // 10 minutes cache
			},
		);
		const meta = pageData?.data?.page_data;

		if (!meta || pageData?.error || pageData?.success === false) {
			return {
				title: '404 - Page Not Found',
				description: 'The requested page could not be found.',
			};
		}

		return {
			title: {
				default: safeParseHtml(meta?.meta_title) || 'Page',
			},
			description: safeParseHtml(meta?.meta_description) || '',
			openGraph: {
				title: safeParseHtml(meta?.og_title) || '',
				description: safeParseHtml(meta?.og_description) || '',
				images: [
					{
						url: meta?.og_image || '',
						alt: meta?.meta_title || '',
					},
				],
			},
		};
	} catch {
		return {
			title: '404 - Page Not Found',
			description: 'The requested page could not be found.',
		};
	}
}

// Synchronous component for rendering page content
function PageContent({ data }) {
	if (
		!data?.data?.page_data ||
		data?.error ||
		data?.success === false ||
		data?.data?.page_data.parent_page_id !== '0'
	) {
		return <ErrorPage />;
	}
	return <RenderedSection data={data?.data} />;
}

// Default export: async server component
export default async function PageDetails({ params: paramsPromise }) {
	const params = await paramsPromise;
	let pageData;
	try {
		pageData = await apiService.get(
			`/api/get-req-data/sections?type=slug&value=${params?.slug}&get_section=yes&image=yes&post=yes&file=yes&gallery=no`,
			{
				cache: true,
				ttl: 5 * 60 * 1000, // 5 minutes cache for regular pages
			},
		);
	} catch (error) {
		pageData = { error: true };
	}

	return <PageContent data={pageData} />;
}
