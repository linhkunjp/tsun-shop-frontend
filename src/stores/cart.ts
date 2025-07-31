import { defineStore } from "pinia";
import CartService from '@/services/CartService'
import { createGuestId } from "@/utils/methods";
import type { DataCart, DataCartAdd } from '@/types/cart'

export const useCartStore = defineStore(
    "cart",
    {
        state: () => ({
            dataCart: [] as DataCart[],
            totalAmount: '',
            cartQuantity: 0,
            isLoading: true,
            userId: localStorage.getItem('user_id') || localStorage.getItem('guest_id') || createGuestId(),
        }),

        actions: {
            async getCart() {
                this.isLoading = true
                const response = await CartService.getCartItem(this.userId)

                if (!response || response.isSuccess === false) {
                    // console.error(response.message || 'Lỗi không xác định');
                    this.isLoading = false
                    return null;
                }

                const results = response.results
                this.dataCart = results.items
                this.isLoading = false

                this.cartQuantity = this.dataCart.reduce((total, item) => total + item.quantity, 0);
                this.recalcTotal()
            },

            // Thêm giỏ hàng, cập nhật sản phẩm đã có sẵn
            async addToCart(item: DataCartAdd) {
                const response = await CartService.adđToCart(this.userId, item)
                this.dataCart = response.items

                this.cartQuantity = this.dataCart.reduce((total, item) => total + item.quantity, 0);
                this.recalcTotal()
            },

            // Cập nhật toàn bộ giỏ hàng
            async updateCart(item: DataCart[]) {
                this.isLoading = true
                const response = await CartService.updateCart(this.userId, item)
                this.dataCart = response.items
                this.isLoading = false

                this.cartQuantity = this.dataCart.reduce((total, item) => total + item.quantity, 0);
                this.recalcTotal()
            },

            // Xóa sản phẩm trong giỏ hàng
            async removeCartItem(id: string) {
                const response = await CartService.removeCartItem(this.userId, id)
                this.dataCart = response.items

                this.cartQuantity = this.dataCart.reduce((total, item) => total + item.quantity, 0);
                this.recalcTotal()
            },

            // Xóa toàn bộ sản phẩm trong giỏ hàng
            async clearCart() {
                const response = await CartService.clearCart(this.userId)
                if (!response || response.isSuccess === false) {
                    // console.error(response.message || 'Lỗi không xác định');
                    return null;
                }

                this.dataCart = []
                this.cartQuantity = 0
                this.totalAmount = ''
                await this.getCart()

            },

            // Tổng tiền
            recalcTotal() {
                const totalNumber = this.dataCart.reduce((sum, item) => {
                    const num = parseInt(
                        item.price.replace('₫', '').replace(/,/g, ''),
                        10
                    )
                    return sum + num * item.quantity
                }, 0)

                // Định dạng: 1,234,567
                this.totalAmount = totalNumber.toLocaleString('en-US')
            },

        }
    }
);

