
import { tsunV1 } from "@/utils/axios";

class CartService {

  // Danh sách sản phẩm
  static async getCartItem(userId: string) {
    try {
      const url = `cart/${userId}`;
      const response = await tsunV1.get(url)
      if (response.data && response.data.isSuccess == true) {
        return response.data;
      } else {
        return response.data
      }
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  // Thêm giỏ hàng, cập nhật sản phẩm đã có sẵn
  static async adđToCart(userId: string, item: object) {
    const body = {
      userId: userId,
      items: [item],
    }

    try {
      const url = "cart";
      const response = await tsunV1.post(url, body)
      if (response.data && response.data.isSuccess == true) {
        return response.data.results;
      } else {
        return response.data
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Cập nhật toàn bộ giỏ hàng
  static async updateCart(userId: string, item: any) {
    const body = {
      userId: userId,
      items: item,
    }

    try {
      const url = "cart/update";
      const response = await tsunV1.put(url, body)
      if (response.data && response.data.isSuccess == true) {
        return response.data.results;
      } else {
        return response.data
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Xóa sản phẩm trong giỏ hàng
  static async removeCartItem(userId: string, id: string) {

    try {
      const url = `cart/${userId}/${id}`;
      const response = await tsunV1.delete(url)
      if (response.data && response.data.isSuccess == true) {
        return response.data.results;
      } else {
        return response.data
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }


}

export default CartService;
