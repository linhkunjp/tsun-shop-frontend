<template>
  <div class="!overflow-x-hidden">
    <div v-if="!isDesktop" class="bg-white border-b border-[#e1e1e1]">
      <div class="max-w-[40em] !px-[1em] w-full !mx-auto !py-3">
        <RouterLink to="/" class="text-black text-[28px] font-medium">tsunsg</RouterLink>
      </div>
    </div>

    <!-- Hide/ show mobile -->
    <div
      v-if="!isDesktop"
      @click="showInfor = !showInfor"
      class="border-b border-[#e1e1e1] bg-[#fafafa] cursor-pointer"
    >
      <div
        class="font-medium flex items-center justify-between max-w-[40em] !px-[1em] w-full !mx-auto !py-3"
      >
        <span class="text-sm text-[#338dbc]"
          ><i class="fa-solid fa-cart-shopping text-[20px] !mr-1"></i> Hiển thị thông tin đơn hàng
          <i
            :class="{ 'rotate-180': showInfor }"
            class="fa fa-angle-down tsun-transition-arrow !text-[16px] !ml-1"
          ></i
        ></span>
        <span class="text-[18px] text-black">{{ cartStore.totalAmount }}₫ </span>
      </div>
    </div>

    <div
      :class="{
        'max-w-[90%] flex !px-[5%] flex-row-reverse': isDesktop,
        'max-w-[40em] !px-[1em] flex-col': !isDesktop,
      }"
      class="w-full !mx-auto h-screen"
    >
      <CheckoutSidebar :showInfor="showInfor" :class="{ 'w-[38%]': isDesktop }" />
      <CheckoutMain :class="{ 'w-[52%]': isDesktop }" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import CheckoutMain from '@/components/ui/checkout/CheckoutMain.vue'
import CheckoutSidebar from '@/components/ui/checkout/CheckoutSidebar.vue'

import { useCartStore } from '@/stores/cart'

export default {
  name: 'CheckoutPage',
  mixins: [deviceMixin],
  components: {
    CheckoutMain,
    CheckoutSidebar,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const showInfor = ref(true)

    const cartStore = useCartStore()

    onMounted(async () => {
      document.title = 'tsunsg - Thanh toán đơn hàng'
      await cartStore.getCart()
    })

    return {
      isMobile,
      isDesktop,
      showInfor,
      cartStore,
    }
  },
}
</script>

<style scoped>
* {
  font-family:
    Helvetica Neue,
    sans-serif !important;
}
</style>
