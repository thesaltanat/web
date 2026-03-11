import ErrorPage from '@/src/components/404';
import { apiService } from '@/src/services';
import parse from 'html-react-parser';
import BlogDetails from '@/src/modules/blog-details/BlogDetails';

export async function generateMetadata({ params: paramsPromise }) {
	const params = await paramsPromise;

	try {
		// Using new optimized ApiService with caching
		const pageData = await apiService.get(
			`/api/get-req-data/blog-data?type=slug&value=${params?.slug}`,
			{
				cache: true,
				ttl: 10 * 60 * 1000, // 10 minutes cache for blog metadata
			},
		);
		const meta = pageData?.data?.data;

		if (!meta || pageData?.error || pageData?.success === false) {
			return {
				title: '404 - Article Not Found',
				description: 'The requested article could not be found.',
			};
		}

		return {
			title: { default: parse(meta.meta_title) || 'Page' },
			description: parse(meta.meta_description) || '',
			openGraph: {
				title: parse(meta.og_title) || '',
				description: parse(meta.og_description) || '',
				images: [
					{
						url: meta.og_image || '',
						alt: meta.meta_title || '',
					},
				],
			},
		};
	} catch (error) {
		return {
			title: '404 - Article Not Found',
			description: 'The requested article could not be found.',
		};
	}
}

export default async function PageDetails({ params: paramsPromise }) {
	const params = await paramsPromise;

	try {
		// Using new optimized ApiService with caching
		const pageData = await apiService.get(
			`/api/get-req-data/blog-data?type=slug&value=${params?.slug}`,
			{
				cache: true,
				ttl: 5 * 60 * 1000, // 5 minutes cache for blog content
			},
		);


		if (
			!pageData?.data?.data ||
			pageData?.error ||
			pageData?.success === false
		) {
			return <ErrorPage />;
		}

		return <BlogDetails data={pageData?.data} />;
	} catch (error) {
		return <ErrorPage />;
	}
}
