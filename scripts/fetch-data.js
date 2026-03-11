#!/usr/bin/env node

/**
 * Build-time script to fetch all API data and save as JSON
 * Run this before building your Next.js app
 */

import { dataFetcher } from '@/src/services/data/DataFetcher.js';

async function main() {
	console.log('═══════════════════════════════════════════════════════');
	console.log('  📦 Pre-fetching API Data for Static Generation');
	console.log('═══════════════════════════════════════════════════════\n');

	try {
		const success = await dataFetcher.fetchAndSave();

		if (success) {
			console.log('\n✅ Build data preparation completed successfully!');
			process.exit(0);
		} else {
			console.log('\n❌ Build data preparation failed!');
			process.exit(1);
		}
	} catch (error) {
		console.error('\n❌ Fatal error during data fetch:', error.message);
		console.error(error.stack);
		process.exit(1);
	}
}

main();
