import { defineStore } from "pinia";
import ProductService from '@/services/ProductService'
import type { ProductItem, PageInfo } from '@/types/product'

export const useCollectionStore = defineStore(
    "collection",
    {
        state: () => ({
            dataProducts: [] as ProductItem[],
            dataPageInfo: {} as PageInfo,
            cache: {} as Record<string, { results: ProductItem[]; pageInfo: PageInfo }>,
            isLoading: true
        }),

        actions: {
            async getProductList(category: string, page: number, sortQuery: string) {
                const cacheKey = `${category}|page=${page}|sort=${sortQuery}`;

                // Nếu category đã có trong cache thì dùng lại
                if (this.cache[cacheKey]) {
                    const cached = this.cache[cacheKey];
                    this.dataProducts = cached.results;
                    this.dataPageInfo = cached.pageInfo;
                    return;
                }

                this.isLoading = true
                // Nếu chưa có, gọi API và lưu vào cache
                const response = await ProductService.getProductList(category, page, sortQuery)

                if (!response || response.isSuccess === false) {
                    console.error(response.message || 'Lỗi không xác định');
                    this.isLoading = false
                    this.cache[cacheKey] = {
                        results: [],
                        pageInfo: {} as PageInfo,
                    };
                    return null;
                }

                this.dataProducts = response.results
                this.dataPageInfo = response.pageInfo
                this.isLoading = false

                // Lưu cache lại để dùng lần sau
                this.cache[cacheKey] = {
                    results: response.results,
                    pageInfo: response.pageInfo,
                };
                return this.dataProducts
            },
        },
    }
);

