
import { tsunV1 } from "@/utils/axios";

class ProductService {

  // Danh sách sản phẩm
  static async getProductList(category: string, page: number, sortQuery: string) {
    const params: Record<string, string> = {
      category: category,
      page: page.toString(),
      sort: sortQuery
    };
    try {
      const url = "collections";
      const response = await tsunV1.get(url, { params })
      if (response.data && response.data.isSuccess == true) {
        return response.data.data;
      } else {
        return response.data
      }
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  // Chi tiết sản phẩm
  static async getProductDetail(slug: string) {
    try {
      const url = `products/${slug}`;
      const response = await tsunV1.get(url)
      if (response.data && response.data.isSuccess == true) {
        return response.data.data;
      } else {
        return response
      }
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  // Tìm kiếm sản phẩm
  static async searchProduct(query: string, page: number) {
    try {
      const url = `search?q=${query}&page=${page}`;
      const response = await tsunV1.get(url)
      if (response.data && response.data.isSuccess == true) {
        return response.data.data;
      } else {
        return response
      }
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }
}

export default ProductService;
