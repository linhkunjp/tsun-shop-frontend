<template>
  <div class="h-full">
    <!-- Main -->
    <div class="text-black !mb-8 !mt-2">
      <template v-if="data.length == 0">
        <div class="text-grey text-sm">Hiện chưa có sản phẩm</div>
      </template>

      <template v-else>
        <div
          v-for="(item, index) in data"
          :key="index"
          :class="{
            'border-b border-dotted border-[#bcbcbc] !pb-5': index !== data.length - 1,
          }"
          class="text-black !mb-5 flex items-center"
        >
          <!-- Image -->
          <div>
            <a class="cursor-pointer" target="_blank">
              <img :src="item.image" class="w-[70px] min-w-[70px] block object-cover" />
            </a>
          </div>

          <!-- Content -->
          <div class="flex flex-col justify-start w-full !ml-5 !mr-[20px] relative">
            <a class="cursor-pointer text-[13px] font-semibold uppercase leading-[1.4]">{{
              item.title
            }}</a>

            <span class="text-xs text-[#080808] opacity-[.7] !mt-0.5">{{
              item.variant?.size
            }}</span>
            <div class="flex items-center !mt-2.5">
              <span class="block text-xs !text-[#080808] !px-3 !py-1 bg-[#ededed] !mr-3">{{
                item.quantity
              }}</span>
              <span class="block text-sm !text-[#080808] font-medium opacity-[.7]">{{
                item.price
              }}</span>
            </div>
            <!-- Close -->
            <button
              @click="cartStore.removeCartItem(item._id)"
              class="cursor-pointer px-2 absolute top-[-3px] right-[-22px]"
            >
              <i class="fa-solid fa-xmark text-[15px] text-black font-medium"></i>
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Line -->
    <div class="!my-5 border-t-2 border-black"></div>
    <div class="text-black !text-sm !uppercase flex items-center justify-between">
      <span>tổng tiền :</span>
      <span>{{ cartStore.totalAmount }}₫</span>
    </div>

    <!-- Action btn -->
    <div class="!my-8 flex items-center gap-4">
      <RouterLink @click="goToCart" to="/cart" class="block w-full">
        <ButtonComp :text="'xem giỏ hàng'" :isBlue="true" class="w-full !text-xs" />
      </RouterLink>

      <ButtonComp
        :disabled="data.length == 0"
        :class="{ 'pointer-events-none !bg-[#ccc] !border-[#ccc]': data.length == 0 }"
        @click="goToCheckout()"
        :text="'thanh toán'"
        :isRed="true"
        class="w-full !text-xs"
      />
    </div>

    <!--  -->
    <div class="text-black text-sm">
      Freeship cho hóa đơn từ 200k Tặng 1 sản phẩm túi tote với hóa đơn từ 299k
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import ButtonComp from '@/components/ui/ButtonComp.vue'

import { useSidebarStore } from '@/stores/sidebar'
import { useCartStore } from '@/stores/cart'
import { useModalStore } from '@/stores/modal'
import { useRouter } from 'vue-router'

export default {
  name: 'SidebarCart',
  mixins: [deviceMixin],
  components: {
    ButtonComp,
  },

  setup() {
    const isMobile = ref(false)

    const sidebarStore = useSidebarStore()
    const modalStore = useModalStore()
    const cartStore = useCartStore()
    const router = useRouter()

    const data = computed(() => cartStore.dataCart)

    function goToCart() {
      modalStore.openModal(false)
      sidebarStore.openSidebar(false, '')
    }

    function goToCheckout() {
      router.push('/checkout')
    }

    return {
      isMobile,
      sidebarStore,
      goToCart,
      goToCheckout,
      cartStore,
      data,
    }
  },
}
</script>
