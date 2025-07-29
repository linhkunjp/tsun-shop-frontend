<template>
  <div
    v-for="(item, index) in tempCart"
    :key="item._id"
    :class="{
      'border-b border-dotted border-[#bcbcbc] !pb-5': index !== tempCart.length - 1,
    }"
    class="text-black !mb-5 flex items-start"
  >
    <!-- Image -->
    <div>
      <a class="cursor-pointer" target="_blank">
        <img :src="item.image" class="max-w-[100px] min-w-[100px] block object-cover" />
      </a>
    </div>

    <!-- Content -->
    <div class="flex flex-col justify-start w-full !ml-5 !mr-[20px] relative">
      <a class="cursor-pointer text-base font-semibold uppercase leading-[1.4] w-fit">{{
        item.title
      }}</a>

      <span class="block text-sm text-black">{{ item.price }}</span>

      <span v-if="item.variant?.size" class="text-sm text-black !mt-1.5">{{
        item.variant.size
      }}</span>
      <span v-if="item.variant?.color" class="text-sm text-black">{{ item.variant.color }}</span>
      <div :class="{ flex: isDesktop }" class="items-center justify-between">
        <QuantityComp
          @quantity="(val: number) => updateQuantity(item._id, val)"
          :dataQuantity="item.quantity || 1"
          :border="true"
          class="!mt-2 w-fit"
        />
        <p class="text-base font-medium !mt-2">
          <span v-if="isMobile">Thành tiền:</span>
          {{ recalcTotal(item.price, item.quantity || 1) }}
        </p>
      </div>

      <!-- Close -->
      <button
        @click="removeItem(index)"
        class="cursor-pointer px-2 absolute top-[-3px] right-[-10px]"
      >
        <i class="fa-solid fa-xmark text-[15px] text-black font-medium"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import type { PropType } from 'vue'
import type { DataCart } from '@/types/cart'

import deviceMixin from '@/utils/deviceMixin'
import QuantityComp from '@/components/ui/QuantityComp.vue'
import { recalcTotal } from '@/utils/methods'

export default {
  name: 'CartMain',
  mixins: [deviceMixin],
  components: {
    QuantityComp,
  },
  props: {
    dataCart: {
      type: Array as PropType<DataCart[]>,
      required: true,
    },
  },
  emits: ['updateCart'],

  setup(props, { emit }) {
    const isMobile = ref(false)
    const isDesktop = ref(false)

    const data = computed(() => props.dataCart)
    const tempCart = ref(props.dataCart.map((item) => ({ ...item })))

    // Cập nhật số lượng theo _id
    function updateQuantity(id: string, val: number) {
      const result = tempCart.value.find((item: any) => item._id === id)
      if (result) {
        result.quantity = val
        emit('updateCart', tempCart.value)
      }
    }

    function removeItem(index: number) {
      tempCart.value.splice(index, 1)
      emit('updateCart', tempCart.value)
    }

    return {
      isMobile,
      isDesktop,
      data,
      recalcTotal,
      updateQuantity,
      tempCart,
      removeItem,
    }
  },
}
</script>
