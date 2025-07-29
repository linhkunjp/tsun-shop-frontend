<template>
  <div>
    <BreadCrumb :dataBreadcrumb="dataBreadcrumb" />

    <!-- Content -->
    <div class="container !mt-9 !mb-20">
      <!-- Title -->
      <div
        class="text-center after:content-[''] after:block after:bg-[#252a2b] after:w-[60px] after:h-[4px] after:!my-[25px] after:!ml-auto after:!mr-auto"
      >
        <h1 class="text-black text-[30px] font-bold">Giỏ hàng của bạn</h1>
        <p class="text-sm text-black">
          Có <strong>{{ cartStore.cartQuantity }} sản phẩm</strong> trong giỏ hàng
        </p>
      </div>

      <div :class="{ 'min-h-[400px]': cartStore.isLoading }" class="relative">
        <!-- No found -->
        <div v-if="data.length == 0" class="text-center">
          <p class="text-sm text-black">Giỏ hàng của bạn đang trống</p>
          <RouterLink to="/">
            <ButtonComp :text="'Tiếp tục mua hàng'" :isBlue="true" :btnCart="true" class="!mt-6.5">
              <i class="fa-solid fa-reply !mr-1"></i>
            </ButtonComp>
          </RouterLink>
        </div>

        <!-- Result -->
        <div v-else class="h-full !mt-12 !mb-14">
          <!-- Item -->
          <CartMain :dataCart="cartStore.dataCart" @updateCart="handleUpdateCart" />

          <!-- Action -->
          <CartAction :dataTotal="totalAmount" :dataCart="tempCart" class="!mt-12" />
        </div>
        <LoadingComp v-if="cartStore.isLoading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import BreadCrumb from '@/components/ui/BreadCrumb.vue'
import ButtonComp from '@/components/ui/ButtonComp.vue'
import CartMain from '@/components/ui/cart/CartMain.vue'
import CartAction from '@/components/ui/cart/CartAction.vue'
import LoadingComp from '@/components/ui/LoadingComp.vue'

import { useCartStore } from '@/stores/cart'

export default {
  name: 'CartPage',
  mixins: [deviceMixin],
  components: {
    BreadCrumb,
    ButtonComp,
    CartMain,
    CartAction,
    LoadingComp,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const totalAmount = ref('')
    const tempCart = ref([])

    const cartStore = useCartStore()
    const data = computed(() => cartStore.dataCart)

    const dataBreadcrumb = computed(() => {
      return [`Giỏ hàng (${cartStore.cartQuantity || 0})`]
    })

    // Nhận dữ liệu từ component con
    function handleUpdateCart(val: any) {
      recalcTotal(val)
      tempCart.value = val
    }

    // Tính toán lại tổng tiền
    function recalcTotal(data: any) {
      const totalNumber = data.reduce((sum: number, item: any) => {
        const num = parseInt(item.price.replace('₫', '').replace(/,/g, ''), 10)
        return sum + num * item.quantity
      }, 0)

      // Định dạng: 1,234,567
      totalAmount.value = totalNumber.toLocaleString('en-US')
    }

    onMounted(() => {
      document.title = 'Giỏ hàng của bạn - tsunsg'
    })

    return {
      isMobile,
      isDesktop,
      dataBreadcrumb,
      data,
      cartStore,
      handleUpdateCart,
      recalcTotal,
      totalAmount,
      tempCart,
    }
  },
}
</script>

<style scoped>
input.search {
  width: calc(100% - 55px);
}
</style>
