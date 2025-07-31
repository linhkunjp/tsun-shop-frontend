import { tsunV1 } from "@/utils/axios";

interface OrderData {
    userId: String,
    items:
    {
        productId: String,
        title: String,
        variant?: {
            color?: String,
            size?: String
        },
        price: String,
        image: String,
    }[]
    ,
    email: String,
    fullName: String,
    phoneNumber: String,
    address: String,
    totalAmount: String,
    province: String,
    district: String,
    ward: String
}

class OrderService {

    // Tạo đơn hàng
    static async createOrder(data: OrderData) {
        try {
            const url = "orders"
            const response = await tsunV1.post(url, data)

            if (response.data && response.data.isSuccess == true) {
                return response.data
            } else {
                return response.data
            }
        } catch (error: any) {
            if (error.response?.data) {
                return error.response?.data
            } else {
                return { isSuccess: false, message: error.message };
            }
        }
    }
}

export default OrderService