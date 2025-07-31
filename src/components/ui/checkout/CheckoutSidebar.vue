<template>
  <div
    :class="{ 'w-[38%] !pl-[4%]': isDesktop, 'after:!left-[-100%] ': !isDesktop }"
    class="text-black bg-[#fafafa] sidebar relative"
  >
    <!-- Item -->
    <div
      v-if="isShowInfor || isDesktop"
      :class="{ '!pt-[3.5em]': isDesktop, '!pt-5': !isDesktop }"
      class="border-b border-[#e1e1e1]"
    >
      <div v-for="(item, index) in data" :key="index" class="!mb-4 flex items-center">
        <div
          class="!min-w-[4.6em] !h-[4.6em] bg-white flex justify-center border border-[#0000001a] rounded-md relative"
        >
          <img :src="item.image" class="object-cover h-full" />
          <span
            class="text-white !py-1 px-2 bg-[#999999e6] absolute right-[-10px] top-[-10px] rounded-full text-center text-xs"
            >{{ item.quantity }}</span
          >
        </div>

        <div class="font-medium !ml-4 !mr-2">
          <span class="text-sm leading-[1.3] text-[#4b4b4b] block">{{ item.title }}</span>
          <span class="text-[12px] text-[#969696] block">{{
            item.variant?.color || item.variant?.size
          }}</span>
        </div>

        <div class="flex-1 text-end">
          <span class="text-sm text-[#4b4b4b] font-medium block">{{
            recalcTotal(item.price, item.quantity)
          }}</span>
        </div>
      </div>
    </div>

    <!-- Discount code -->
    <div class="flex items-center gap-3 !mt-5 !pb-4 border-b border-[#e1e1e1]">
      <InputComp
        v-model="discountCode"
        :placeholder="'Mã giảm giá'"
        name=""
        class="flex-1 w-full"
      />
      <button
        :class="{ 'pointer-events-none !bg-[#ccc]': discountCode == '' }"
        class="text-white !text-sm bg-[#338dbc] rounded !py-[0.88em] !px-[1.7em] cursor-pointer hover:brightness-[1.2]"
      >
        Sử dụng
      </button>
    </div>

    <!-- Ship -->
    <div v-if="isShowInfor || isDesktop" class="!mt-5 !pb-5 border-b border-[#e1e1e1]">
      <div class="text-sm text-[#717171] font-medium flex items-center justify-between !mb-2">
        <span>Tạm tính</span>
        <span>{{ cartStore.totalAmount }}₫</span>
      </div>

      <div class="text-sm text-[#717171] font-medium flex items-center justify-between">
        <span>Phí vận chuyển</span>
        <span>—</span>
      </div>
    </div>

    <!-- Total -->
    <div
      v-if="isShowInfor || isDesktop"
      :class="{ 'border-b border-[#e1e1e1]': !isDesktop }"
      class="!mt-3 !pb-1"
    >
      <div class="font-medium flex items-center justify-between !mb-2">
        <span class="text-base text-[#717171]">Tổng cộng</span>
        <span class="text-[24px] text-black">{{ cartStore.totalAmount }}₫ </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, computed } from 'vue'

import deviceMixin from '@/utils/deviceMixin'
import InputComp from './components/InputComp.vue'
import { recalcTotal } from '@/utils/methods'

import { useCartStore } from '@/stores/cart'

export default {
  name: 'CheckoutSidebar',
  mixins: [deviceMixin],
  components: { InputComp },
  props: {
    showInfor: Boolean,
    modelValue: String,
  },

  setup(props) {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const isShowInfor = ref(true)
    const discountCode = ref('')

    const cartStore = useCartStore()
    const data = computed(() => cartStore.dataCart)

    watch(
      () => props.showInfor,
      (newVal) => {
        isShowInfor.value = newVal
      },
    )

    watch(
      () => props.modelValue,
      (newVal) => {
        discountCode.value = newVal ?? ''
      },
    )

    return {
      isMobile,
      isDesktop,
      data,
      isShowInfor,
      discountCode,
      cartStore,
      recalcTotal,
    }
  },
}
</script>

<style scoped>
.sidebar::after {
  content: '';
  display: block;
  width: 300%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #fafafa;
  z-index: -1;
  left: 0;
  background-position: left top;
  box-shadow: 0 -1px 0 #e1e1e1 inset;
}

* {
  font-family:
    Helvetica Neue,
    sans-serif !important;
}
</style>
