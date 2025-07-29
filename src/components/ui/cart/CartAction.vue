<template>
  <div :class="{ 'grid-cols-2': isDesktop, 'grid-cols-1': !isDesktop }" class="grid gap-6">
    <div>
      <textarea
        class="text-black bg-[#ededed] text-[15px] resize-none !p-5 h-[130px] border-none w-full"
        rows="8"
        cols="50"
        placeholder="Ghi chú"
      ></textarea>
    </div>

    <div class="w-full text-right">
      <p class="font-medium text-black text-base !mb-[30px]">
        Tổng tiền: <span class="!text-[30px] !ml-2">{{ dataTotal }}</span>
      </p>
      <div class="flex items-center justify-end flex-wrap gap-2">
        <ButtonComp :text="'Tiếp tục mua hàng'" :isBlue="true" :btnCart="true"
          ><i class="fa-solid fa-reply !mr-1"></i>
        </ButtonComp>
        <ButtonComp
          @click="updateCart"
          :disabled="isDisabled"
          :class="{ 'pointer-events-none !bg-[#ccc] !border-[#ccc]': isDisabled }"
          :text="'Cập nhật'"
          :isBlue="true"
          :btnCart="true"
        />
        <ButtonComp @click="handlePay" :text="'Thanh toán'" :isRed="true" :btnCart="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import type { DataCart } from '@/types/cart'

import deviceMixin from '@/utils/deviceMixin'
import ButtonComp from '@/components/ui/ButtonComp.vue'
import { useCartStore } from '@/stores/cart'
import { isEqual } from 'lodash' // So sánh sâu (deep equal) 2 object hoặc array
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export default {
  name: 'CartAction',
  mixins: [deviceMixin],
  components: {
    ButtonComp,
  },
  props: {
    dataTotal: String,
    dataCart: {
      type: Array as PropType<DataCart[]>,
      required: true,
    },
  },

  setup(props) {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const cartStore = useCartStore()
    const toast = useToast()
    const router = useRouter()

    const originalCart = ref<any[]>([])
    const hasInitialized = ref(false)

    // Theo dõi props.dataCart, lưu lại vào originalCart 1 lần khi có dữ liệu
    watch(
      () => props.dataCart,
      (newVal) => {
        if (!hasInitialized.value && newVal && newVal.length > 0) {
          originalCart.value = JSON.parse(JSON.stringify(newVal))
          hasInitialized.value = true
        }
      },
      { deep: true, immediate: true },
    )

    // Kiếm tra thay đổi
    const isDisabled = computed(() => {
      return isEqual(originalCart.value, props.dataCart)
    })

    function handlePay() {
      if (!isDisabled.value) {
        toast.add({
          severity: 'error',
          summary: 'Vui lòng cập nhật lại giỏ hàng để thanh toán',
          group: 'tl',
          life: 5000,
        })
      } else {
        router.push('/checkout')
      }
    }

    async function updateCart() {
      if (!isDisabled.value) {
        await cartStore.updateCart(props.dataCart)
        toast.add({
          severity: 'success',
          summary: 'Cập nhật giỏ hàng thành công',
          group: 'tl',
          life: 3000,
        })
        originalCart.value = JSON.parse(JSON.stringify(props.dataCart)) // Cập nhật lại originalCart
      }
    }

    return {
      isMobile,
      isDesktop,
      updateCart,
      handlePay,
      isDisabled,
    }
  },
}
</script>
