// File removed, restored to previous state via git.
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

/**
 * Centralized Data Fetcher
 * Fetches all API data and converts to JSON files
 * This runs during build time or on server startup
 */
class DataFetcher {
	constructor() {
		this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
		this.timeout = 30000; // 30 seconds for build-time fetching
		this.outputDir = path.join(process.cwd(), 'public', 'data');

		this.client = axios.create({
			baseURL: this.baseURL,
			timeout: this.timeout,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
	}

	/**
	 * API Endpoints Configuration
	 * Define all your API endpoints here
	 */
	getEndpoints() {
		return {
			// Global data
			global: '/api/get-req-data/global-data',

			// Pages
			home: '/api/get-req-data/sections?type=slug&value=home&get_section=yes&image=yes&post=yes&file=yes&gallery=no',
			aboutUs:
				'/api/get-req-data/sections?type=slug&value=about-us&get_section=yes&image=yes&post=yes&file=yes&gallery=no',
			contactUs:
				'/api/get-req-data/sections?type=slug&value=contact-us&get_section=yes&image=yes&post=yes&file=yes&gallery=no',

			// Blog
			blogCategories: '/api/get-req-data/all-category?type=1',
			blogList: '/api/get-req-data/blog-list',

			// Products
			allProducts: '/api/get-req-data/all-products',
			featuredProducts:
				'/api/get-req-data/all-featured-products?image=yes&file=yes&post=yes',

			// Add more endpoints as needed
		};
	}

	/**
	 * Fetch data from a single endpoint
	 */
	async fetchEndpoint(endpoint) {
		try {
			const response = await this.client.get(endpoint);
			return {
				success: true,
				data: response.data,
				timestamp: new Date().toISOString(),
			};
		} catch (error) {
			console.error(`Failed to fetch ${endpoint}:`, error.message);
			return {
				success: false,
				error: error.message,
				status: error.response?.status || 500,
				timestamp: new Date().toISOString(),
			};
		}
	}

	/**
	 * Fetch all configured endpoints
	 */
	async fetchAllData() {
		const endpoints = this.getEndpoints();
		const results = {};

		console.log('🚀 Starting data fetch from API...');

		const fetchPromises = Object.entries(endpoints).map(
			async ([key, endpoint]) => {
				console.log(`  ⏳ Fetching ${key}...`);
				const data = await this.fetchEndpoint(endpoint);

				if (data.success) {
					console.log(`  ✅ ${key} fetched successfully`);
				} else {
					console.log(`  ❌ ${key} failed: ${data.error}`);
				}

				return [key, data];
			},
		);

		const fetchedData = await Promise.all(fetchPromises);

		fetchedData.forEach(([key, data]) => {
			results[key] = data;
		});

		console.log('✨ All data fetched!');
		return results;
	}

	/**
	 * Save data to JSON files
	 */
	async saveToJSON(data) {
		try {
			// Ensure output directory exists
			await fs.mkdir(this.outputDir, { recursive: true });

			console.log('💾 Saving data to JSON files...');

			// Save individual files for each endpoint
			const savePromises = Object.entries(data).map(
				async ([key, value]) => {
					const filePath = path.join(this.outputDir, `${key}.json`);
					await fs.writeFile(
						filePath,
						JSON.stringify(value, null, 2),
						'utf-8',
					);
					console.log(`  ✅ Saved ${key}.json`);
				},
			);

			await Promise.all(savePromises);

			// Also save a combined file
			const combinedPath = path.join(this.outputDir, 'all-data.json');
			await fs.writeFile(
				combinedPath,
				JSON.stringify(data, null, 2),
				'utf-8',
			);
			console.log(`  ✅ Saved all-data.json`);

			// Save metadata
			const metadata = {
				lastUpdated: new Date().toISOString(),
				endpoints: Object.keys(data),
				totalEndpoints: Object.keys(data).length,
			};
			const metadataPath = path.join(this.outputDir, 'metadata.json');
			await fs.writeFile(
				metadataPath,
				JSON.stringify(metadata, null, 2),
				'utf-8',
			);
			console.log(`  ✅ Saved metadata.json`);

			console.log('✨ All JSON files saved successfully!');
			return true;
		} catch (error) {
			console.error('❌ Failed to save JSON files:', error.message);
			return false;
		}
	}

	/**
	 * Main function to fetch and save all data
	 */
	async fetchAndSave() {
		console.log('🎯 Starting data fetch and save process...\n');

		const data = await this.fetchAllData();
		const saved = await this.saveToJSON(data);

		if (saved) {
			console.log('\n🎉 Data fetch and save completed successfully!');
			console.log(`📁 Files saved to: ${this.outputDir}`);
		} else {
			console.log('\n⚠️  Data fetch completed but save failed');
		}

		return saved;
	}

	/**
	 * Fetch data for a specific page/slug dynamically
	 */
	async fetchPageData(slug) {
		const endpoint = `/api/get-req-data/sections?type=slug&value=${slug}&get_section=yes&image=yes&post=yes&file=yes&gallery=no`;
		return await this.fetchEndpoint(endpoint);
	}

	/**
	 * Fetch and save dynamic page data
	 */
	async fetchAndSavePageData(slug) {
		const data = await this.fetchPageData(slug);

		if (data.success) {
			await fs.mkdir(this.outputDir, { recursive: true });
			const filePath = path.join(this.outputDir, `page-${slug}.json`);
			await fs.writeFile(
				filePath,
				JSON.stringify(data, null, 2),
				'utf-8',
			);
			console.log(`✅ Saved page-${slug}.json`);
		}

		return data;
	}
}

// Export singleton instance
export const dataFetcher = new DataFetcher();

// Export class for custom instances
export default DataFetcher;
