import { defineStore } from "pinia";
import ProductService from '@/services/ProductService'
import type { ProductDetail, ProductItem } from '@/types/product'

export const useProductStore = defineStore(
    "product",
    {
        state: () => ({
            dataProductRelated: [] as ProductItem[],
            dataProduct: {} as ProductDetail,
            productCache: {} as Record<string, { results: ProductDetail }>,
            isLoading: true
        }),

        actions: {
            async getProductDetail(slug: string) {
                // Nếu đã có trong cache, trả về ngay
                if (this.productCache[slug]) {
                    const cached = this.productCache[slug];
                    this.dataProduct = cached.results;
                    return
                }
                this.isLoading = true
                const response = await ProductService.getProductDetail(slug)
                if (!response || response.isSuccess === false) {
                    console.error(response.message || 'Lỗi không xác định');
                    this.isLoading = false
                    return null;
                }
                this.dataProduct = response.results;
                this.isLoading = false

                // Lưu cache lại để dùng lần sau
                this.productCache[slug] = {
                    results: response.results,
                };

                return this.dataProduct;
            }
        },
    }
);

