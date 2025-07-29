<template>
  <div>
    <!-- Title -->
    <div class="pb-2 border-b border-dotted border-[#dfe0e1]">
      <p class="text-black text-[20px] !font-bold leading-[1.2]">{{ data.title }}</p>
      <span class="text-[#A3A5A7] text-xs">{{ data.pro_sku }}</span>
    </div>

    <!-- Price -->
    <div class="flex items-center !mt-2.5">
      <span
        v-if="data.pro_sale"
        class="text-[#F94C43] text-xs !font-semibold bg-[#EDEDED] px-3 py-1.5"
        >{{ data.pro_sale }}</span
      >
      <span class="text-[#F94C43] text-lg !font-bold !mx-2.5">{{ data.pro_price }}</span>
      <span class="text-[#777a7b] text-sm !font-medium line-through">{{ data.regular_price }}</span>
    </div>

    <!-- Size -->
    <template v-if="data.variants && data.variants.length > 0">
      <RadioComp :data="data.variants" @update:selected="getSelectionChanged" />
    </template>

    <div :class="isMobile ? 'flex-col justify-start' : ''" class="flex gap-4 !mt-5 !mb-2">
      <QuantityComp @quantity="getQuantity" />

      <!-- Button action -->
      <div class="w-full">
        <ButtonComp
          :isRed="true"
          :text="'thêm vào giỏ'"
          @click="addToCart"
          class="w-full !font-bold !text-xs !py-3.5"
        />
        <RouterLink
          v-if="isBtnDetail"
          :to="`/products/${data.slug}`"
          @click="goToProductDetail"
          class="block text-black text-xs font-bold uppercase underline !ml-3 !mt-4 cursor-pointer"
          >xem chi tiết sản phẩm</RouterLink
        >
        <ButtonComp
          v-if="isBtnBuy"
          :isRed="true"
          :text="'mua ngay'"
          class="w-full !font-bold !text-xs !py-3.5 !mt-4"
        />
      </div>
    </div>

    <!-- More info -->
    <slot></slot>
  </div>

  <!-- Describe -->
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import type { ProductDetail } from '@/types/product'

import deviceMixin from '@/utils/deviceMixin'
import RadioComp from '@/components/ui/RadioComp.vue'
import QuantityComp from '@/components/ui/QuantityComp.vue'
import ButtonComp from '@/components/ui/ButtonComp.vue'

import { useCartStore } from '@/stores/cart'
import { useSidebarStore } from '@/stores/sidebar'
import { useModalStore } from '@/stores/modal'

export default {
  name: 'ProdDetail',
  mixins: [deviceMixin],
  components: {
    RadioComp,
    QuantityComp,
    ButtonComp,
  },
  props: {
    isBtnDetail: {
      type: Boolean,
      default: false,
    },
    isBtnBuy: {
      type: Boolean,
      default: false,
    },
    dataDetail: {
      type: Object as PropType<ProductDetail>,
      required: true,
    },
  },

  setup(props) {
    const isMobile = ref(false)

    const cartStore = useCartStore()
    const sidebarStore = useSidebarStore()
    const modalStore = useModalStore()

    const dataVariant = ref({})
    const dataQuantity = ref(1)

    const data = computed(() => props.dataDetail || [])

    function goToProductDetail() {
      modalStore.openModal(false)
    }

    function getSelectionChanged(selected: { size?: string; color?: string }) {
      dataVariant.value = selected
    }

    function getQuantity(val: number) {
      dataQuantity.value = val
    }

    function addToCart() {
      const dataCart = {
        productId: data.value._id,
        title: data.value.title,
        variant: dataVariant.value,
        quantity: dataQuantity.value,
        price: data.value.pro_price,
        image: data.value.images[0],
      }

      sidebarStore.openSidebar(true, 'cart')
      cartStore.addToCart(dataCart)
    }

    return {
      isMobile,
      cartStore,
      data,
      goToProductDetail,
      getSelectionChanged,
      getQuantity,
      addToCart,
    }
  },
}
</script>
