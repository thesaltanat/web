// Export all data services from a single entry point
export { apiService } from './api/ApiService.js';
export { dataFetcher } from './data/DataFetcher.js';
export { dataReader } from './data/DataReader.js';

// Re-export for backward compatibility
export {
    getAllProduct, getApi, getApiJson, getBlogData,
    getBlogDataSingle, getCategoryBlogData, getFeaturedProduct, getGlobalApi, getProductSingle
} from './api/ApiService.js';

