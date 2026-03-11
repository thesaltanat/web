import { MetadataRoute } from 'next';

/**
 * Sitemap Metadata Route
 *
 * Generates a dynamic XML sitemap for search engines.
 * Auto-generates sitemap.xml at the root when deployed.
 *
 * Each entry in the sitemap helps search engines:
 * - Discover all public pages
 * - Know when they were last updated
 * - Understand update frequency
 * - Prioritize crawling
 *
 * Next.js automatically serves this at /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL || 'https://thesaltanat.com';

	// Main routes that are always included
	const mainRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1.0,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/press-release`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/careers`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	];

	// TODO: Add dynamic routes here if you fetch them from database
	// Example:
	// const projects = await fetchProjects();
	// const projectRoutes = projects.map((project) => ({
	//   url: `${baseUrl}/projects/${project.slug}`,
	//   lastModified: new Date(project.updatedAt),
	//   changeFrequency: 'monthly' as const,
	//   priority: 0.7,
	// }));

	return mainRoutes;
	// return [...mainRoutes, ...projectRoutes];
}
