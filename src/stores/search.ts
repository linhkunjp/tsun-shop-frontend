import { defineStore } from "pinia";
import ProductService from '@/services/ProductService'
import type { ProductDetail, PageInfo } from '@/types/product'

export const useSearchStore = defineStore(
    "search",
    {
        state: () => ({
            dataProducts: [] as ProductDetail[],
            dataPageInfo: {} as PageInfo,
            searchCache: {} as Record<string, { results: ProductDetail[]; pageInfo: PageInfo }>,
            isLoading: false,
            searchQuery: ''
        }),

        actions: {
            async searchProduct(query: string, page: number) {
                if (query == '') return
                const cacheKey = `q=${query}|page=${page}`;
                this.searchQuery = query

                // Nếu q đã có trong cache thì dùng lại
                if (this.searchCache[cacheKey]) {
                    const cached = this.searchCache[cacheKey];
                    this.dataProducts = cached.results;
                    this.dataPageInfo = cached.pageInfo;
                    return;
                }

                this.isLoading = true
                // Nếu chưa có, gọi API và lưu vào cache
                const response = await ProductService.searchProduct(query, page)
                if (!response || response.isSuccess === false) {
                    console.error(response.message || 'Lỗi không xác định');
                    this.isLoading = false
                    return null;
                }
                this.dataProducts = response.results
                this.dataPageInfo = response.pageInfo
                this.isLoading = false

                // Lưu cache lại để dùng lần sau
                this.searchCache[cacheKey] = {
                    results: response.results,
                    pageInfo: response.pageInfo,
                };

                return this.dataProducts;
            },
        },
    }
);

